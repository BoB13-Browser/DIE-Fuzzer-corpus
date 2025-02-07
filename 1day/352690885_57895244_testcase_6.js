function GC(){

    for(let i = 0; i < 2; i++){
        new ArrayBuffer(0x10000000);
    }

}

let arrow_function;

class C {

    get x() { 
        return 900; 
    }

};

class D {

    get x() { 
        return 800; 
    }

};

for (let j = 0; j < 10; j++){

    new class A extends D {

        constructor(){

            super();

            try {

                new class B extends C {

                    [new class extends (() => {

                        print("super.x - value inside class definition:  " + super.x);

                        arrow_function = (() => { return super.x;});

                        return Array;

                    })(){}()] = eval();
                }();

            } catch(e){
                
            }

            
        }
    }();


    if (j == 8){

        print("------------------------------Garbage Collector-----------------------------");

        GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();

    }

}

print("super.x - value outside class definition: " + arrow_function());