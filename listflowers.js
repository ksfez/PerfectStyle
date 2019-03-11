const debug = require("debug")("mongo:listflowers");
const Shoe = require('./model')("Shoe");

(async () => {
    // Inquire all the flowers at once and get it as an array
    try {
        shoes = await Shoe.REQUEST();
        //console.dir(flowers, { showHidden: true, colors: true });
        console.log(shoes);
    } catch (err) { debug(`Failed: ${err}`) }



    // Inquire the flowers one-by-one and provide a callback to process each one
    try {
        let index = 0;
        await Shoe.REQUEST(async shoe => console.log(`Data ${++index}:\n${shoe}`));
        console.log('Finished');
        process.exit(0);
    } catch (err) { debug(`Failed: ${err}`) }
    process.exit(0);
	
	//Ctrl -K comments
	//Ctrl -Q de-comments
	//Ctrl -D copy all the paragraph after it
	//Ctrl -J put all on one line
	
})();
