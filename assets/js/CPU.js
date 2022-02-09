console.log("CPU LOADED");
var eqn="0";
var ans="0";
var base=10;
var board=0;
var notMod=0;
var answerd=false;

var bit = "0000000000000000000000000000000000000000000000000000000000000000";
var bitmode = 4;


setTimeout("updateCalci()",100);


function Refresh()
{
    //alert("fuck");
    location.reload();
}

function KeyPress(event)
{
    if(board==0) return 0;
    var x = event.which || event.keyCode;
    //alert(x);
    if(x==13)
    submit();
    else if(x==42)
    press("x");
    else if(x==60) 
    press("<<");
    else if(x==62)
    press(">>");
    else if((x>=65 && x<=70) ||(x>=97 && x<=102))
    {
        if(base==16)
        press(""+String.fromCharCode(x).toUpperCase());
        else
        shake("equation");
    }
    else if(x>=48 && x<=57)
    press(x-48);
    else
    {
        var s= ""+String.fromCharCode(x);
        if(s=="x") clearDisp();
        else if(s=="z") erase();
        else
        press(s);
    }
   
}
function printbit()
{
    var s="";
    for(var a=0;a<64;a++)
    s+=0;
    console.log(s);
}
function press(x) 
{
    
    if(eqn=="0") eqn="";
    if (typeof (x) === 'string')
    {
        
        if(answerd)
        {
            if(base==10)
            eqn="$";
            else
            eqn=makeBasi(ans);
            answerd=false;
        }
        switch(x)
        {
            
            case "+":
            case "-":
            case "~":
            case "(":
            case ")":
            case ">>":
            case "<<":
            case "/":
            case "A":
            case "B":
            case "C":
            case "D":
            case "E":
            case "F":
                eqn+=x;
                break;
            case "x":
                eqn+="*";
                break;
            case "÷":
                eqn+="/";
                break;
            case "&":
            {
                if(notMod==0)
                eqn+="&";
                else
                eqn+="‾";
                break;
            }
            case "|":
            {
                if(notMod==0)
                eqn+="|";
                else
                eqn+="!";
                break;
            }
            case "^":
            {
                if(notMod==0)
                eqn+="^";
                else
                eqn+="⊙";
                break;
            }
        }

    } 
    else if(typeof(x)==='number')
    {
        if(answerd)
        {
            eqn=""+x;
            answerd=false;
        }
        else
        eqn+=x;
    }
    updateDisplay();

}

function notMode()
{
   if(notMod==0)
   {
        notMod=1;
        var x=document.getElementById("AND");
        x.innerHTML="NAND";
        x=document.getElementById("OR");
        x.innerHTML="NOR";
        x=document.getElementById("XOR");
        x.innerHTML="XNOR";
   }
   else
   {
        notMod=0;
        var x=document.getElementById("AND");
        x.innerHTML="AND";
        x=document.getElementById("OR");
        x.innerHTML="OR";
        x=document.getElementById("XOR");
        x.innerHTML="XOR";
   }
}
function pressbit(b)
{
    var o=bit.charAt(b);
    if(o=='0')
    setBit(b,1);
    else
    setBit(b,0);
    
}
function setBit(x,y)
{
    bit=setCharAt(bit,x,y);
    updateBitBoard();
}
function setBitBoard()
{
    bit = "1111111111111111111111111111111111111111111111111111111111111111";
    updateBitBoard();
}
function clearbitBoard()
{
    bit = "0000000000000000000000000000000000000000000000000000000000000000";
    updateBitBoard();
}
function updateBitBoard()
{
    for(var a=0;a<64;a++)
    {
        var s="bit"+a;
        var x =  document.getElementById(s);
        x.innerHTML=setCharAt((x.innerHTML),8,bit.charAt(a));
    }
    var x = binToDec(reverseString(bit));
    eqn=""+x;
    document.getElementById("equation").innerHTML=beautify();
    document.getElementById("hex").innerHTML="HEX : "+hex(x);
    document.getElementById("dec").innerHTML="DEC : "+x;
    document.getElementById("oct").innerHTML="OCT : "+oct(x);
    document.getElementById("bin").innerHTML="BIN : "+bin(x);
    //updateDisplay();
}



function togBoard()
{

    if(board==0)
    {
        var x =document.getElementById("bitpad");
        x.style.display="none";
        x =document.getElementById("keypad");
        x.style.display="block";
        disableKey("btn_word");
        board=1;
    }
    else
    {
        var x =document.getElementById("keypad");
        x.style.display="none";
        x =document.getElementById("bitpad");
        x.style.display="block";
        disableKey("btn_eraseB");
        disableKey("btn_baseB");
        board=0;

    }
}
function togBitMode()
{
    if(bitmode==4)
    bitmode=3;
    else if(bitmode==3)
    bitmode=2;
    else if(bitmode==2)
    bitmode=1;
    else if(bitmode==1)
    bitmode=4;
    if(bitmode==4)
    {
        var x = document.getElementById("btn_wordB");
        x.innerHTML="QWORD";
        for(var a=0;a<64;a++)
        {
            
            EnableKey("bit"+a);
        }
    }
    if(bitmode==3)
    {
        var x = document.getElementById("btn_wordB");
        x.innerHTML="DWORD";
        for(var a=63;a>31;a--)
        {
            setBit(a,0);
            disableKey("bit"+a);
        }
    }
    if(bitmode==2)
    {
        var x = document.getElementById("btn_wordB");
        x.innerHTML="WORD";
        for(var a=31;a>15;a--)
        {
            setBit(a,0);
            disableKey("bit"+a);
        }
    }
    if(bitmode==1)
    {
        var x = document.getElementById("btn_wordB");
        x.innerHTML="BYTE";
        for(var a=16;a>7;a--)
        {
            setBit(a,0);
            disableKey("bit"+a);
        }
    }
}
function Cbase()
{
    if(base==10)
    base=8;
    else if(base==16)
    base=10;
    else if(base==2)
    base=16;
    else if(base==8)
    base=2;
    updateKeypad();

}
function pm()
{
    eqn=neg(eqn);
    updateDisplay();
}
function erase()
{
    if(eqn.length>1)
    {
        if(eqn.charAt(eqn.length-1)=='<' || eqn.charAt(eqn.length-1)=='>' )
        eqn=eqn.substring(0,eqn.length-2);
        else
        eqn=eqn.substring(0,eqn.length-1);
    }
    else
    eqn="0";
    updateDisplay();

}
function clearDisp()
{   

    eqn="0";
    ans="0";
    answerd=false;
    updateDisplay();
    clearbitBoard();
}

function submit() 
{
    //eqn=eqn.replace("$",ans);
    eqn=corPar(eqn);
    eqn=remCon(eqn);
    eqn=matchPar(eqn);
    if(!isBasic(eqn))
    shake("equation");
    console.log(eqn);
    console.log(solveNot(eqn));
    if(!isValidMathExpression(solveNot(makeDeci(eqn.replace("x","*")))))
    {
        shake("equation");
    }
    else
    {
        ans=eval(solveNot(makeDeci(eqn.replace("$",ans))));
        var ans2=""+ans;
        if(ans2.includes("."))
        ans2=ans2.substring(0,ans2.indexOf("."));
        ans=ans2;
        //new
        eqn=makeBasi(ans);
      // ans=makeBasi(ans);
        answerd=true;
    //eqn="ANS";
    }
    updateDisplay();
}
function beautify()
{
    var s="";
    // for(var a =0;a<eqn.length;a++)
    // if(a%4==0 && a!=0)
    // s+=" "+eqn.charAt(a);
    // else
    // s+=eqn.charAt(a);
   s= eqn.replace("$",ans);
    //s= eqn.replace("$",makeBasi(ans));
    //s=makeBasi(s);
    s= s.replaceAll("*","x");
    return s;
}
function updateKeypad()
{
    var s;
    if(base==10) s="DEC";
    if(base==16) s="HEX";
    if(base==8) s="OCT";
    if(base==2) s="BIN";
    document.getElementById("btn_base").innerHTML=s;
    if(base==16)
    {
        EnableKey("btn_A");EnableKey("btn_B");EnableKey("btn_C");
        EnableKey("btn_D");EnableKey("btn_E");EnableKey("btn_F");
        EnableKey("btn_9");EnableKey("btn_8");EnableKey("btn_7");
        EnableKey("btn_6");EnableKey("btn_5");EnableKey("btn_4");
        EnableKey("btn_3");EnableKey("btn_2");
    }
    if(base==10)
    {
        disableKey("btn_A");disableKey("btn_B");
        disableKey("btn_C");disableKey("btn_D");
        disableKey("btn_E");disableKey("btn_F");
    }
    if(base==8)
    {
        disableKey("btn_9");
        disableKey("btn_8");
    }
    if(base==2)
    {
        disableKey("btn_7"); disableKey("btn_6");
        disableKey("btn_5");disableKey("btn_4");
        disableKey("btn_3");disableKey("btn_2");
    }
    updateDisplay();
}
function disableKey(s)
{
    var x =document.getElementById(""+s);
    x.disabled =true;
    x.style.color="grey";
}
function EnableKey(s)
{
    var x =document.getElementById(""+s);
    x.disabled =false;
    x.style.color="white";
}
function updateDisplay()
{
    if(eqn=="") eqn="0";
    //eqn=makeBasi(eqn);
    document.getElementById("equation").innerHTML=beautify();
    document.getElementById("answer").innerHTML=makeBasi(ans);
    document.getElementById("hex").innerHTML="HEX : "+hex(ans);
    document.getElementById("dec").innerHTML="DEC : "+ans;
    document.getElementById("oct").innerHTML="OCT : "+oct(ans);
    document.getElementById("bin").innerHTML="BIN : "+bin(ans);
}
function updateCalci()
{
    updateDisplay();
    updateKeypad();
    togBoard();
    clearbitBoard();
}
/////////////////////////////////////////////////////////////////////
function isBasic(s)
{
    if(base<=10)
    {
        if(s.includes("A")||s.includes("B")||s.includes("C")||s.includes("D")||s.includes("E")||s.includes("F"))
        return false;
    }
    if(base<=8)
    {
        if(s.includes("9")||s.includes("8")) return false;
    }
    if(base<=2)
    {
        if(s.includes("7")||s.includes("6")||s.includes("5")||s.includes("4")||s.includes("3")||s.includes("2"))
        return false;
    }
    return true;
}

function isValidMathExpression(expr)
{
    try{
        eval(expr);
        return true;
    }
    catch(ex){
        return false;
    }
}
function remCon(s) // removes --++ etc
{
    while(s.includes("--")||s.includes("++")||s.includes("+-")||s.includes("-+"))
    {
        s=s.replaceAll("--","+");    
        s=s.replaceAll("++","+");
        s=s.replaceAll("-+","-");
        s=s.replaceAll("+-","-");
    }
    return s;
}
function matchPar(s)
{
    var x=0;
    for(var a=0;a<s.length;a++)
    if(s.charAt(a)=="(")
    x++;
    else if(s.charAt(a)==")")
    x--;
    for(;x>0;x--)
    s+=")";
    return s;
}
function corPar(s)
{
    var r=s;
    for(var a=0;a<=9;a++)
    {
        var q=a+"(";
        var p=a+"*(";
        r=r.replaceAll(q,p);
    }
    return r;
}
function neg(s)
{
    var a=s.length-1;
    for(;a>=0;a--)
    {
        if(!(s.charAt(a)>='0' && s.charAt(a)<='9'))
        break;
    }
    if(a>0 && s.charAt(a)=='-')
    {
        var p=s.substring(a);
        var q=s.substring(a+1);
        s=s.replace(p,q);
    }
    else if(a>0 && s.charAt(a)=='+')
    {
        var p=s.substring(a);
        var q=s.substring(a+1);
        s=s.replace(p,"-"+q);
    }
    else
    {
        var p=s.substring(a+1);
        s=s.replace(p,"-"+p);
    }
    return s;
}
function makeDeci(s)
{
    var x="";
    var r="";
    for(var a =0;a<s.length;a++)
    {
        if((s.charAt(a)>='0' && s.charAt(a)<='9' ) || s.charAt(a)=='A' || s.charAt(a)=='B' || s.charAt(a)=='C' || s.charAt(a)=='D' || s.charAt(a)=='E'|| s.charAt(a)=='F')
        x+=s.charAt(a);
        else
        {
            r+=ConvertDec(x)+s.charAt(a);
            x="";
        }
    }
    
    r+=ConvertDec(x);
    return r;
}
function makeBasi(x)
{
    if(base==10) return x;
    if(base==16) return hex(x);
    if(base==8) return oct(x);
    if(base==2) return bin(x);
}
function ConvertDec(s)
{
    if(s=="") return "";
    if(base==16)
    return hexToDec(s);
    if(base==8)
    return octToDec(s);
    if(base==2)
    return binToDec(s);
    if(base==10) return s;
}
function solveNot(st)
{
    
    var s =st;
    var Priority ="!‾⊙";
    for(var m =0;m<Priority.length;m++)
    while(contains(s,Priority.charAt(m)))
    {
        //if(isnum(s)) break;
        var k = s.indexOf(Priority.charAt(m));
        var s1="";
        var s2="";
        var b,e;
        
        for( b=k+1;b<s.length;b++)
        if((s.charAt(b)>='0' && s.charAt(b)<='9')||(s.charAt(b)=="-" && b==k+1))
        s1+=s.charAt(b);
        else
        break;
        for( e=k-1;e>=0;e--)
        if(s.charAt(e)>='0' && s.charAt(e)<='9')
        s2=s.charAt(e)+s2;
        else if(s.charAt(e)=="-")
        {
            if(e==0)
            s2=s.charAt(e)+s2;
            else if(!(s.charAt(e-1)>='0' && s.charAt(e-1)<='9'))
            s2=s.charAt(e)+s2;
            else
            break;
        }
        else 
        break;
        var c = Priority.charAt(m);
        if(c=="‾")
        s=s.replace(s.substring(e+1,b),"~("+s1+"&"+s2+")");
        if(c=="⊙")
        s=s.replace(s.substring(e+1,b),"~("+s1+"^"+s2+")");
        if(c=="!")
        s=s.replace(s.substring(e+1,b),"~("+s1+"|"+s2+")");
        //console.log(s);
    }

    return s;
}

////////////////////////////////////////////////
function shake(s)
{
    document.getElementById(s+"").animate([
        {transform: 'translate(20px,0px)'},
        {transform: 'translate(-20px,0px)'},
        
    ], {
        duration: 100,
        iterations: 3,
        delay: 0
    });
}
///////////////////////////////////////////////////////////////////////
function twosComplement(value, bitCount)
{
    let binaryStr;
    
    if (value >= 0) {
      let twosComp = value.toString(2);
      binaryStr    = padAndChop(twosComp, '0', (bitCount || twosComp.length));
    } else {
      binaryStr = (Math.pow(2, bitCount) + value).toString(2);
      
      if (Number(binaryStr) < 0) {
        return undefined
      }
    }
    
    return `${binaryStr}`;
  }
  
  function padAndChop(str, padChar, length) 
  {
    return (Array(length).fill(padChar).join('') + str).slice(length * -1);
  }
function bin(bn)
{
    if(bn>=0)
    {
        if(bn<=1) return bn;
        const  n = BigInt(bn);
        return bin(n>>1n)+""+(n%2n);
    }
    var s=""+bn;
    s=s.substring(1);
    return "-"+bin(s);
}

function oct(bn)
{
    if(bn>=0)
    {
        if(bn<=7) return bn;
        const  n = BigInt(bn);
        return oct(n>>3n)+""+(n%8n);
    }
    var s=""+bn;
    s=s.substring(1);
    return "-"+oct(s);
}

function hex(bn)
{
    if(bn>=0)
    {
        if(bn<=15) return hexW(bn);
        const  n = BigInt(bn);
        return hex(n>>4n)+""+hexW(n%16n);
    }
    var s=""+bn;
    s=s.substring(1);
    return "-"+hex(s);
}
function hexW(n)
{
    if(n<=9) return n;
    else if(n==10) return "A";
    else if(n==11) return "B";
    else if(n==12) return "C";
    else if(n==13) return "D";
    else if(n==14) return "E";
    else if(n==15) return "F";
}
//........

function binToDec(bn)
{
    return BigInt("0b"+bn);
}
function binToHex(bn)
{
    return hex(binToDec(bn));
}
function binToOct(bn)
{
    return oct(binToDec(bn));
}

//.........

function octToDec(bn)
{
    return BigInt("0o"+bn);
}
function octToBin(bn)
{
    return bin(octToDec(bn));
}
function octToHex(bn)
{
    return hex(octToDec(bn));
}

//.........
function hexToDec(bn)
{
    return BigInt("0x"+bn);
}
function hexToBin(bn)
{
    return bin(hexToDec(bn));
}
function hexToOct(bn)
{
    return oct(hexToDec(bn));
}



function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
function contains(s,c)
{
    var x = s.indexOf(c);
    if(x==-1)
    return false;
    return true;
}