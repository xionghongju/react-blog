module.exports = {
  params(key){
    const method = this.request.method
    if(method ==='GET'){
      return key ? this.query[key]:this.query;
    }else{
      return key? this.request.body[key] :this.request.body;
    }
  }  
};