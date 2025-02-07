/**
 * V8 Flags: --stress-lazy-source-positions --no-enable_slow_asserts
 * **/

new class {
    
    constructor(){

        new class {

            [new class extends (() => {
                
                try{ super.test = 0 } catch {}

                return Array;

            })() {

            }()] = super.test;

        };
    }
};