// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function Module() {
  "use asm";

  function f() {
    var $0 = 0,
        $25 = 0,
        $i$014$i = 0,
        $sum$013$i = 0,
        $v_0$01$i = 0,
        $v_1$02$i = 0,
        $v_10$011$i = 0,
        $v_11$012$i = 0,
        $v_2$03$i = 0,
        $v_3$04$i = 0,
        $v_4$05$i = 0,
        $v_5$06$i = 0,
        $v_6$07$i = 0,
        $v_7$08$i = 0,
        $v_8$09$i = 0,
        $v_9$010$i = 0;
    $i$014$i = 0;
    $sum$013$i = 0;
    $v_0$01$i = 8;
    $v_1$02$i = 9;
    $v_10$011$i = 18;
    $v_11$012$i = 19;
    $v_2$03$i = 10;
    $v_3$04$i = 11;
    $v_4$05$i = 12;
    $v_5$06$i = 13;
    $v_6$07$i = 14;
    $v_7$08$i = 15;
    $v_8$09$i = 16;
    $v_9$010$i = 17;

    do {
      $v_0$01$i = $v_3$04$i + $v_9$010$i + $v_0$01$i | 0;
      $v_1$02$i = $v_4$05$i + $v_10$011$i + $v_1$02$i | 0;
      $v_2$03$i = $v_5$06$i + $v_11$012$i + $v_2$03$i | 0;
      $v_3$04$i = $v_3$04$i + $v_6$07$i + $v_0$01$i | 0;
      $v_4$05$i = $v_4$05$i + $v_7$08$i + $v_1$02$i | 0;
      $v_5$06$i = $v_5$06$i + $v_8$09$i + $v_2$03$i | 0;
      $v_6$07$i = $v_6$07$i + $v_9$010$i + $v_3$04$i | 0;
      $v_7$08$i = $v_7$08$i + $v_10$011$i + $v_4$05$i | 0;
      $v_8$09$i = $v_8$09$i + $v_11$012$i + $v_5$06$i | 0;
      $v_9$010$i = $v_0$01$i + $v_9$010$i + $v_6$07$i | 0;
      $v_10$011$i = $v_1$02$i + $v_10$011$i + $v_7$08$i | 0;
      $v_11$012$i = $v_2$03$i + $v_11$012$i + $v_8$09$i | 0;
      $25 = $v_0$01$i + $v_1$02$i | 0;
      $sum$013$i = $v_2$03$i + $sum$013$i + $v_5$06$i + $v_4$05$i + $v_8$09$i + $v_3$04$i + $25 + $v_7$08$i + $v_11$012$i + $v_6$07$i + $v_10$011$i + $v_9$010$i | 0;
      $i$014$i = $i$014$i + 1 | 0;
    } while (($i$014$i | 0) <= 0);

    return $sum$013$i - ($v_5$06$i + $v_2$03$i + $v_4$05$i + $v_8$09$i + $25 + $v_3$04$i + $v_7$08$i + $v_11$012$i + $v_6$07$i + $v_10$011$i + $v_9$010$i);
  }

  return {
    f: f
  };
}

Module().f();