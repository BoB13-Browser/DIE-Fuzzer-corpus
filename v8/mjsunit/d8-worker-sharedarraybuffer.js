// Copyright 2015 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// Flags: --harmony-sharedarraybuffer
if (this.Worker) {
  (function TestTransfer() {
    var workerScript = `onmessage = function(m) {
       var sab = m;
       var ta = new Uint32Array(sab);
       if (sab.byteLength !== 16) {
         throw new Error('SharedArrayBuffer transfer byteLength');
       }
       for (var i = 0; i < 4; ++i) {
         if (ta[i] !== i) {
           throw new Error('SharedArrayBuffer transfer value ' + i);
         }
       }
        // Atomically update ta[0]
        Atomics.store(ta, 0, 100);
      };`;
    var w = new Worker(workerScript);
    var sab = new SharedArrayBuffer(16);
    var ta = new Uint32Array(sab);

    for (var i = 0; i < 4; ++i) {
      ta[i] = i;
    } // Transfer SharedArrayBuffer


    w.postMessage(sab, [sab]);
    assertEquals(16, sab.byteLength); // ArrayBuffer should not be neutered.
    // Spinwait for the worker to update ta[0]

    var ta0;

    while ((ta0 = Atomics.load(ta, 0)) == 0) {}

    assertEquals(100, ta0);
    w.terminate();
    assertEquals(16, sab.byteLength); // Still not neutered.
  })();

  (function TestTransferMulti() {
    var workerScript = `onmessage = function(msg) {
       var sab = msg.sab;
       var id = msg.id;
       var ta = new Uint32Array(sab);
       Atomics.store(ta, id, 1);
       postMessage(id);
      };`;
    var sab = new SharedArrayBuffer(16);
    var ta = new Uint32Array(sab);
    var id;
    var workers = [];

    for (id = 0; id < 4; ++id) {
      workers[id] = new Worker(workerScript);
      workers[id].postMessage({
        sab: sab,
        id: id
      }, [sab]);
    } // Spinwait for each worker to update ta[id]


    var count = 0;

    while (count < 4) {
      for (id = 0; id < 4; ++id) {
        if (Atomics.compareExchange(ta, id, 1, -1) == 1) {
          // Worker is finished.
          assertEquals(id, workers[id].getMessage());
          workers[id].terminate();
          count++;
        }
      }
    }
  })();
}