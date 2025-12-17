interface props{
    params:{
        shortUrl:String
    }
}

async function  RealUrl() {
    
}

export default async function({params}:props){
    const {shortUrl} =await params
    console.log(shortUrl)
    

}