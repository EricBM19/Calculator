const NUMBERS = document.getElementsByName('data-number');
const OPERATORS = document.getElementsByName('data-opera');
const EQUAL = document.getElementsByName('data-equal')[0];
const SIGN = document.getElementsByName('data-sign');
const COMMA = document.getElementsByName('data-point');
const ERASE = document.getElementsByName('data-del')[0];
const CLEAR = document.getElementsByName('data-clear')[0];
var display = document.getElementById('inputText');
var firstOperator = '';
var secondOperator = '';
var operationText = '';
var result;

//Buttons

NUMBERS.forEach(function(button)
{
    button.addEventListener('click', function()
    {
        addNumber(button.innerText);
    })
})

OPERATORS.forEach(function(button)
{
    button.addEventListener('click', function()
    {
        selectOperation(button.innerText);
    })
})

COMMA.forEach(function(button)
{
    button.addEventListener('click', function()
    {
        addComa(button.innerText);
    })
})

EQUAL.addEventListener('click', function()
{
    calculate();
    updateDisplay();
})

CLEAR.addEventListener('click', function()
{
    clearDisplay();
})

ERASE.addEventListener('click', function()
{
    eraseNumber();
})

SIGN.forEach(function(button)
{
    disableSignChange();
    button.addEventListener('click', function()
    {
        changeSign();
    })
})

function addNumber(num)
{

    if (result != null)
    {
        firstOperator = num.toString();
        result = null;
        updateDisplay();
    }
    else if(firstOperator.length < 10)
    {
        firstOperator = firstOperator.toString() + num.toString();
        updateDisplay();
    }
    else if((firstOperator.includes('-') || firstOperator.includes('.')) && firstOperator.length < 11)
    {
        firstOperator = firstOperator.toString() + num.toString();
        updateDisplay();
    }
    else if((firstOperator.includes('-') && firstOperator.includes('.')) && firstOperator.length < 12)
    {
        firstOperator = firstOperator.toString() + num.toString();
        updateDisplay();
    }
    else    
    {
        disableNumberButtons();
    }
}

function addComa(comma)
{
    if(firstOperator == '')
    {
        firstOperator = '0' + comma.toString();
        updateDisplay;
    }
    else if(firstOperator == '-')
    {
        firstOperator = firstOperator + '0' + comma.toString();
        updateDisplay;
    }
    else if(firstOperator.includes('.'))
    {
        disableComma();
        firstOperator = firstOperator;
        updateDisplay();
    }
    else
    {
        enableComma();
        firstOperator = firstOperator.toString() + comma.toString();
        updateDisplay();
    }
}

function selectOperation(operator)
{
    if(operationText != '')
    {
        clearOperatorColor(operationText);
        operationText = operator.toString();
        selectOperatorColor(operationText);
        enableNumberButtons();
    }
    else if(firstOperator == '') return;
    else
    {
        operationText = operator.toString();
        enableNumberButtons();
        

        selectOperatorColor(operationText);
        secondOperator = firstOperator;
        firstOperator = '';
        console.log(operationText);
    }

    if(secondOperator != '')
    {
        calculate();
    }
}

function calculate()
{
    const OPERATOR = parseFloat(secondOperator);
    const SECOND_OPERATOR = parseFloat(firstOperator);
    if(isNaN(OPERATOR) || isNaN(SECOND_OPERATOR)) return;
    switch(operationText)
    {
        case '+':
            result = OPERATOR + SECOND_OPERATOR;
            break;
        case '-':
            result = OPERATOR - SECOND_OPERATOR;
            break;
        case '*':
            result = OPERATOR * SECOND_OPERATOR;
            break;
        case '/':
            result = OPERATOR / SECOND_OPERATOR;
            break;
        default:
            return;
    }
    
    enableComma();
    clearOperatorColor(operationText);
    disableSignChange();
    enableNumberButtons();
    result = result.toString();
    resultChecker(result);
}

function resultChecker(result)
{
    if(result.length < 10)
    {
        firstOperator = result;
        secondOperator = '';
        operationText = '';
        updateDisplay();
    }
    else if((result.includes('-') || result.includes('.')) && result.length < 11)
    {
        firstOperator = result;
        secondOperator = '';
        operationText = '';
        updateDisplay();
    }
    else if((result.includes('-') && result.includes('.')) && result.length < 12)
    {
        firstOperator = result;
        secondOperator = '';
        operationText = '';
        updateDisplay();
    }
    else
    {
        firstOperator = 'ERROR';
        secondOperator = '';
        operationText = '';
        updateDisplay();
        disableNumberButtons();
    }
}

function updateDisplay()
{
    display.value = firstOperator;
}

function clearDisplay()
{ 
   enableNumberButtons();
   disableSignChange();
   clearOperatorColor(operationText);
   enableComma();
   display.value = '0';
   firstOperator = '';
   secondOperator = '';
   result = null;
   operationText = '';  
}

function selectOperatorColor(operationText)
{
    for(i = 0; i < OPERATORS.length; i++)
    {
        if(OPERATORS[i].innerText == operationText)
        {
            OPERATORS[i].style.color = 'yellow';
        }
    }
}

function clearOperatorColor(operationText)
{
    for(i = 0; i < OPERATORS.length; i++)
    {
        if(OPERATORS[i].innerText == operationText)
        {
            OPERATORS[i].style.color = 'black';
        }
    }
}

function eraseNumber()
{
    firstOperator = firstOperator.slice(0,-1);
    display.value = firstOperator
}

function changeSign()
{
    if(firstOperator == '' || firstOperator == '0' || firstOperator == '0.')
    {
        disableSignChange();
    }
    else if(firstOperator != '')
    {
        enableSignChange();
        if(firstOperator.includes('-'))
        {
            firstOperator = firstOperator.replace('-','');
            updateDisplay();
        }
        else
        {
            firstOperator = '-' + firstOperator;
            updateDisplay();
        }
    }
}

//Enable and disable

function disableNumberButtons()
{
    NUMBERS.forEach(number => 
        {
            number.disable = true;
            number.style.color = 'red';
        });
}

function enableNumberButtons()
{
    NUMBERS.forEach(number => 
        {
            number.disable = false;
            number.style.color = 'black';
        });
}

function enableSignChange()
{
    SIGN.forEach(signChange =>
        {
           signChange.disable = false;
           signChange.style.color = 'black'; 
        })
}

function disableSignChange()
{
    SIGN.forEach(signChange =>
        {
           signChange.disable = true;
           signChange.style.color = 'red'; 
        })
}

function enableComma()
{
    COMMA.forEach(decimal =>
        {
            decimal.disable = false;
            decimal.style.color = 'black';
        })
}

function disableComma()
{
    COMMA.forEach(decimal =>
        {
            decimal.disable = true;
            decimal.style.color = 'red';
        })
}

//Keyboard

window.addEventListener('keydown', (e) =>
{
    if
    ( e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || 
        e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' ||
        e.key === '9' || e.key === '0')
    {
        clickNumberKey(e.key);
    }
    else if
    ( e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' )
    {
        clickOperationKey(e.key);
    }
    else if (e.key == 'Enter')
    {
        clickEqualKey();
    }
    else if(e.key == 'Escape')
    {
        clickClearKey(e.key);
    }
    else if(e.key === '.')
    {
        clickPointKey(e.key);
    }
    else if(e.key == 'Backspace')
    {
        eraseNumber();
    }
    else if(e.key == 'Control')
    {
        changeSign();
    }
})

function clickNumberKey(key)
{
    NUMBERS.forEach(button => 
        {
            if(button.innerText === key)
            {
                button.click();
            }
        })
}

function clickOperationKey(key)
{
    OPERATORS.forEach(button => 
        {
            if(button.innerText === key)
            {
                button.click();
            }
        })
}

function clickEqualKey()
{
    EQUAL.click();
}

function clickClearKey()
{
    CLEAR.click();
}

function clickDel()
{
    ERASE.click();
}

function clickPointKey(key)
{
    COMMA.forEach(button => 
        {
            if(button.innerText === key)
            {
                button.click();
            }
        })
}
