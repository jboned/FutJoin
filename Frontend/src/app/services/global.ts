export let GLOBAL = {
    url: 'http://localhost:3000/api/'
};

export class dateService{
      convertDate(d:string){
        var parts = d.split(" ");
        var months = {Jan: "01",Feb: "02",Mar: "03",Apr: "04",May: "05",Jun: "06",Jul: "07",Aug: "08",Sep: "09",Oct: "10",Nov: "11",Dec: "12"};
        return parts[3]+"-"+months[parts[1]]+"-"+parts[2];
       }

      toLocalISOString(d) {
        var off = d.getTimezoneOffset();
          return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - off, d.getSeconds(), d.getMilliseconds()).toISOString();
      }

}
