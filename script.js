const LA = document.getElementById('LA'),
    LA2 = document.getElementById('LA2'),
    GA = document.getElementById('GA'),
    GA2 = document.getElementById('GA2'),
    LB = document.getElementById('LB'),
    LB2 = document.getElementById('LB2'),
    GB = document.getElementById('GB'),
    GB2 = document.getElementById('GB2'),
    distance = document.getElementById('D'),
    direction = document.getElementById('dir');

function calculat() {
    if (document.getElementById('dd').checked) {
        let gammaA = document.getElementById('gammaA').value * 3.14 / 180,
            gammaB = document.getElementById('gammaB').value * 3.14 / 180,
            lamdaA = document.getElementById('lamdaA').value * 3.14 / 180,
            lamdaB = document.getElementById('lamdaB').value * 3.14 / 180;
    } else {

        let gammaA = document.getElementById('gammaA').value * 3.14 / 180,
            gammaB = document.getElementById('gammaB').value * 3.14 / 180,
            lamdaA = document.getElementById('lamdaA').value * 3.14 / 180,
            lamdaB = document.getElementById('lamdaB').value * 3.14 / 180;
    }
    switch (document.getElementById('method')) {
        case (1):

            break;
        case (2):
            break;
        case (3):
            break;
    }
}

function DD_DMS(n) {
    switch (n) {
        case (1):
            LA.style.display = 'flex';
            GA.style.display = 'flex';
            LB.style.display = 'flex';
            GB.style.display = 'flex';
            LA2.style.display = 'none';
            GA2.style.display = 'none';
            LB2.style.display = 'none';
            GB2.style.display = 'none';
            break;
        case (2):
            LA2.style.display = 'flex';
            GA2.style.display = 'flex';
            LB2.style.display = 'flex';
            GB2.style.display = 'flex';
            LA.style.display = 'none';
            GA.style.display = 'none';
            LB.style.display = 'none';
            GB.style.display = 'none';
            break;
    }
}