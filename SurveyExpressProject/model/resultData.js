class ResultData {


    makeSuccessWithData(data){
        this.code='SUCCESS';
        this.data=data;
    }

    makeSuccess(){
        this.code='SUCCESS';
    }

}

module.exports = new ResultData();
