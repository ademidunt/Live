const webHandler =  require('./webHandler')
const APIROUTE = 'Venue/';

const getVenueProfiles = async function() {
    //AsedlTwX2fdmuN0yWiM1k4BzKFb2
    try {

        const json =  await webHandler.get(`${APIROUTE}`);
        return json;
    }
    catch(err){

    }
    
}

const getVenueProfile = async (id) =>{
    //AsedlTwX2fdmuN0yWiM1k4BzKFb2
    try {
        const json =  await webHandler.get(`${APIROUTE}${id}`);
        return json;
    }
    catch(err){

    }
    
}

module.exports = {
    getVenueProfile,
    getVenueProfiles,

}

