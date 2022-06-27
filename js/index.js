const objSettings = {
    minValue: 0, // минимальное значение диапазона
    maxValue: 200, // максиммальное значение диапазона
    rangeWidth: 310, // ширина range в пикселях
    realMinX: 0,
    realMaxX: 310 
}

const min = document.querySelector('.min'),
    max = document.querySelector('.max'),
    range = document.querySelector('.range'),
    inputMin = document.getElementById('min'), // input с меньшим значением
    inputMax = document.getElementById('max'); // input с большим значением

min.style.left = '-10px' // чтобы курсор был посередине блока min
max.style.right = '-10px'



range.style.maxWidth = objSettings.rangeWidth + 'px'; // зададим ширину range в px

const inputs = [objSettings.minValue, objSettings.maxValue]; // создаем массив из меньшего и большего значения
inputMin.value = inputs[0];
inputMax.value = inputs[1];
console.log(inputs)

min.addEventListener('mousedown', mouseEvt)
max.addEventListener('mousedown', mouseEvt)
document.addEventListener('mouseup', mouseEvt)

//положение range на странице с учетом отступов
let deltaMinX = range.getBoundingClientRect().left;
let deltaMaxX = range.getBoundingClientRect().right;
console.log(deltaMinX, deltaMaxX)

// определяем на min max нажата ли клавиша мыши и перемещается
function mouseEvt(e) {

    if (e.type === 'mousedown') {
        // console.log(this)
        this.addEventListener('mousemove', movePoint)
    }
    if (e.type === 'mouseup') {
        // console.log(this)
        min.removeEventListener('mousemove', movePoint)
        max.removeEventListener('mousemove', movePoint)
    }
}

// вычислим значение одной позиции (1px)
// пусть весь диапазон от 0 до 250 руб, а ширина range 500px
// тогда перемещение на 1px это будет 0.5 рубля
// 1руб = 250/500
valuePix = objSettings.maxValue / objSettings.rangeWidth;

// вычислим координаты курсора и переместим min max на позицию курсора

function movePoint() {

    // вычислим реальную координату положения min
    if (this.className == 'min') {
        min.style.zIndex = 2
        max.style.zIndex = 1

        realMinX = event.pageX - deltaMinX;

        objSettings.realMinX = realMinX;
        // console.log(objSettings.realMinX)
        minValue = realMinX * valuePix;
        inputs[0] = Math.floor(minValue);
        // console.log(inputs[0])
        if (inputs[0] < 0) {
            inputs[0] = 0;
            return;
        }
        if (inputs[0] > inputs[1]) {
            inputs[0] = inputs[1];
            return;
        }
        this.style.transform = `translateX(${realMinX}px)`;

    }
    if (this.className == 'max') {
        min.style.zIndex = 1
        max.style.zIndex = 2
        realMaxX = deltaMaxX - event.pageX;

        objSettings.realMaxX = realMaxX;
        maxValue = objSettings.maxValue - realMaxX * valuePix
        inputs[1] = Math.floor(maxValue)

        console.log(objSettings)
        if (inputs[1] < inputs[0]) {
            inputs[1] = 0;
            return;
        }
        if (inputs[1] > objSettings.maxValue) {
            inputs[1] = objSettings.maxValue;
            return;
        }
        max.style.transform = `translateX(${-realMaxX}px)`;

    }
    // console.log(inputs)
    inputMin.value = inputs[0];
    inputMax.value = inputs[1];

    render();

}

// --------------------
inputMin.addEventListener('input', changeMinRange);
inputMax.addEventListener('input', changeMaxRange);

function changeMinRange() {
    this.style.border = '1px solid black'
    min.style.zIndex = 2
    max.style.zIndex = 1
    objSettings.realMinX = this.value / valuePix;
  
    inputs[0] = +this.value;
    if (inputs[0] > inputs[1] || inputs[0] < objSettings.minValue || inputs[0] > objSettings.maxValue) {
        this.style.border = '1px solid red'
        return;
    }
    min.style.transform = `translateX(${objSettings.realMinX}px)`;
    render();
}

function changeMaxRange() {
    this.style.border = '1px solid black'
    min.style.zIndex = 1
    max.style.zIndex = 2
    objSettings.realMaxX = objSettings.rangeWidth - this.value / valuePix;

    inputs[1] = +this.value;
    if (inputs[1] < inputs[0] || inputs[1] > objSettings.maxValue || inputs[1] < objSettings.minValue) {
        this.style.border = '1px solid red'
        return;
    }
    max.style.transform = `translateX(${-objSettings.realMaxX}px)`;
    render();
}

function render(){
    console.log(objSettings)
    console.log(inputs)
    if(objSettings.realMinX < objSettings.rangeWidth - objSettings.realMaxX){
       document.querySelectorAll('.input').forEach(item => {
            item.style.border = '1px solid black';
        })
    }
    console.log(inputs)
}