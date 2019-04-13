function validate() 
{
    var cardnum = document.creditForm.cardNo.value;
    var regex = /^[0-9]+$/;
    var mInput = document.creditForm.expiryMonth.value;
    var yInput = document.creditForm.expiryYr.value;
    var secu = document.creditForm.sec_code.value;
    
    if (!cardnum.match(regex)) 
        {
            alert("Please enter a valid number");
            document.creditForm.cardNo.focus();
            return false;
    }
    if (cardnum.length != 16)
        {
            alert("Please enter a valid 16 digit number");
            document.creditForm.cardNo.focus();
            return false;
        }
    if (!luhnCheck(cardnum))
        {
            alert("Invalid card number entered");
            return false;
        }
    if (!mInput.match(regex) || !yInput.match(regex))
        {
            alert("Only numbers allowed in the date field");
            return false;
        }
    if (!secu.match(regex))
        {
            alert("Only numbers allowed in the security code field");
            return false;
        }
    
    //Check expiry date
    var month = parseInt(document.creditForm.expiryMonth.value);
    var year = parseInt(document.creditForm.expiryYr.value);
    var d = new Date();
    var cMonth = d.getMonth();
    var cYear = d.getFullYear();
    
    //add 1 to month to match real date
    cMonth = cMonth + 1;
    //Get two digit year
    cYear = cYear - 2000;
    
    if(month > 12)
        {
            alert("Invalid month entered")
            return false;
        }
    if (month <= cMonth && year <= cYear)
        {
            alert("The date is expired");
            return false;
        }  
    
}

function luhnCheck(cardnum)
{
    var check = 0;
    var ndigit = 0;
    var even = false;
    
    for (var i = cardnum.length - 1; i >= 0; i--)
        {
            var cdigit = cardnum.charAt(i);
            var ndigit = parseInt(cdigit, 10);
            
            if (even)
            {
                if ((ndigit *= 2) > 9)
                {
                    ndigit -= 9;
                }
            } 
            check += ndigit;
            even = !even;
        }
    
    return (check % 10) == 0;
}
