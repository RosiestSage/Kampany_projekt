export class Tanar{
    /**
    //Név;Tanári;Kiket tanít;Fun Fact;Jutalom1,Jutalom2,

     */
    constructor(sor) {
        const split = sor.split(";")
        this.Nev = split[0];
        this.Tanari = split[1];        
        this.TanitottOsztalyok = split[2]; 
        this.Funfact = split[3];        
        this.Jutalmak = split[4];        
        this.Src = split[5];        
    }
}

export class Product {

    constructor(id, price, name) {
        this.Size;
        this.Color;

        this.id = id
        this.Price = price
        this.Name = name
    }

    toServerRepr() {
        return {"color": this.Color, "size": this.Size, "quantity": Number(this.Amount)}
    }
}


export class Merch{
    /**
    //Id;Merchnév;Kép1,Kép2;Ár;színek
     
     */
    constructor(sor) {
        const split = sor.split(";")
        this.Id = split[0];   
        this.MerchName = split[1];  
        let sources = split[2].split(",")
        this.Sources = sources;  
        this.Ár = Number(split[3]);   
        this.Colours = split[4];   



    }
}