let result = document.getElementById('result');
let clickNum = document.querySelectorAll('.number');
let dots = document.getElementById('dots');
let calculating = document.getElementById('calculating');
let reset = document.getElementById('reset');
let cal = document.querySelectorAll('.cal');
let equal = document.getElementById('equal');
let checkCal = false;
let pheptinh='+-x/';
//Ham bam so
function getNum(){
    clickNum.forEach((element =>{
        element.addEventListener('click',function(){
            if(checkCal == true){
                checkCal = false;
                result.value = 0;
            }
            result.value += this.value;
            if(result.value.search('\\.') == -1) 
                result.value *=1;
        })
    }));
}

//Ham bam dau cham
function getDots(){
    dots.onclick = function(){
        if(result.value.search('\\.') == -1){
            result.value += '.';
        }
    }
}

//Ham reset
function resetNow(){
    reset.onclick = function(){
        calculating.textContent = '';
        result.value = 0;
    }
}

//Ham tinh ket qua
function getResult(){
    if(checkCal == false){
        calculating.textContent += result.value;
    }
    checkCal = true;
    text = calculating.textContent;
    //Neu ky tu cuoi la phep tinh thi khong thuc hien
    if(text != '' && !pheptinh.includes( text.charAt(text.length - 1) ) ){
        //phep cong
        if(text.search('\\+') != -1){
            let index = text.search('\\+');
            result.value = text.slice(0,index)*1 + text.slice(index+1,text.length) * 1;
        }
        //pheps tru
        else if(text.slice(1,text.length).search('\\-') != -1){
            let index = text.slice(1,text.length).search('\\-') + 1;
            result.value = text.slice(0,index)*1 - text.slice(index+1,text.length) * 1;
        }
        //phep nhan
        else if(text.search('\\x') != -1 ){
            let index = text.search('\\x');
            result.value = text.slice(0,index) * text.slice(index+1,text.length);
        }
        //phep chia
        else if(text.search('\\/') != -1){
            let index = text.search('\\/');
            let number = text.slice(index +1,text.length);
            if(number == 0){
                result.value = 'Cannot divide by zero';
                calculating.textContent = '';
            }else{
                result.value = text.slice(0,index) / number;
            }
        }
    }

}

//Ham xu ly phep +,-,*,/
function calculation(){
    cal.forEach((e)=>{
        e.onclick =function(){
            if(calculating.textContent != ''){
                getResult();
            }
            checkCal = true;
            calculating.textContent = result.value + e.value;
        }
    })
}

getNum();
getDots();
resetNow();
calculation();

//xu ly bam dau bang
equal.onclick = function(){
    if(checkCal){
        calculating.textContent.split('').forEach((e,index)=>{
            if(isNaN(e*1) && index != 0){
                calculating.textContent = result.value 
                + calculating.textContent.slice(index,calculating.textContent.length);
                return;
            }
        })
    }
    getResult();
};



