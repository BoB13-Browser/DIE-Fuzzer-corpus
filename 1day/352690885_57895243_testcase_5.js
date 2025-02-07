function GC(){

    for(let i = 0; i < 2; i++){
        new ArrayBuffer(0x10000000);
    }

}

for (let j = 0; j < 10; j++){

        new class {

            constructor(){

                try{ 
                    new class {

                    [new class extends (() => {
                   
                        print(super.__proto__);
                       
                        return Object;

                    })(){}()] = eval();

                    }(); 
                } catch(error) {

                    print(error);

                }
            }
        }();



    if (j == 8){

        print("------------------------------Garbage Collector-----------------------------");

        GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();GC();

    }
}