var map = {};
var menu = {};
var nodemap = {};
(function(){
    map = {
        canvas: document.getElementById("myCanvas"),
        w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h: Math.max(document.documentElement.clientHeight,window.innerHeight|| 0),
        img: new Image(),
        currentOrigin: {x:0,y:0,scale:1},
        coors: {x:0,y:0,ax:0,ay:0},
        originOffset: {x:0,y:0},
        screenBeingDragged: false
    }
    map.canvas.width = map.w;
    map.canvas.height= map.h;
    map.ctx = map.canvas.getContext('2d');
    map.img.src = "assets/dasda.png";
    menu = {
        menuEnabled:true,
        cards:{
            selectedFile:true,
            schedule:false,
            options:false,
            generate:false
        },
        infos:{
            contact:'Contact Us at this random site',
            about:'This was made by 2 guys'
        },
        iCard:0,
        contact_about:false,
        schools: ['Cypress Creek High School','Freedom Loser High SChool','Apopka High SChool'],
        progress:0,
        schedule:[],
        colorCounter: 0,
        possibleColors:["#ff595e","#f79256","#ffca3a","#8ac926","#1982c4","#6a4c93","#565554"]
    }
    nodemap = {
          "currentOrigin": {
            "x": 881.8856978814363,
            "y": 573.835101306646,
            "scale": 1
          },
          "nodes": [
            {
              "classroom": null,
              "x": -574.1152943858274,
              "y": -305.43453034059496,
              "radius": 10,
              "color": "#000080",
              "name": "Biology",
              "type": 1,
              "floor": 1,
              "class": "Classroom 7"
            },
            {
              "classroom": null,
              "x": -584.1013551030758,
              "y": -53.99607724228679,
              "radius": 10,
              "color": "#000080",
              "name": "Phyisics",
              "type": 1,
              "floor": 1,
              "class": "Classroom 5"
            },
            {
              "classroom": null,
              "x": -574.1152943858274,
              "y": -187.6974769056729,
              "radius": 10,
              "color": "#008000",
              "name": "Hallway 1",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": -406.3494743360556,
              "y": -419.180497218401,
              "radius": 19,
              "color": "#008000",
              "name": "Main Building",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": -285.51813965735084,
              "y": -186.6997052663939,
              "radius": 10,
              "color": "#008000",
              "name": "Hallway 2",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": -434.3104443443509,
              "y": -117.85346215614288,
              "radius": 10,
              "color": "#008000",
              "name": "Gym",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": -432.3132322009012,
              "y": 6.86799275373221,
              "radius": 10,
              "color": "#000080",
              "name": "Math",
              "type": 1,
              "floor": 1,
              "class": "Classroom 3"
            },
            {
              "classroom": null,
              "x": -191.6491689152166,
              "y": -261.5325782123189,
              "radius": 10,
              "color": "#000080",
              "name": "English",
              "type": 1,
              "floor": 1,
              "class": "Classroom 4"
            },
            {
              "classroom": null,
              "x": -191.6491689152166,
              "y": -116.85569051686389,
              "radius": 10,
              "color": "#000080",
              "name": "Spanish",
              "type": 1,
              "floor": 1,
              "class": "Classroom 2"
            },
            {
              "classroom": null,
              "x": -116.75371353585422,
              "y": -388.24957640075195,
              "radius": 10,
              "color": "#008000",
              "name": "Hallway C",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": -288.5139578725254,
              "y": -345.34539591175496,
              "radius": 10,
              "color": "#008000",
              "name": "Shortcut A",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": 29.042772935971243,
              "y": -388.24957640075195,
              "radius": 10,
              "color": "#000080",
              "name": "History",
              "type": 1,
              "floor": 1,
              "class": "Classroom 1"
            },
            {
              "classroom": null,
              "x": -693.9480229928073,
              "y": -186.69970526639383,
              "radius": 10,
              "color": "#000080",
              "name": "Chemistry",
              "type": 1,
              "floor": 1,
              "class": "Classroom 6"
            },
            {
              "classroom": null,
              "x": -633.0330526175926,
              "y": -333.3721362404069,
              "radius": 10,
              "color": "#008000",
              "name": "New Node",
              "type": 0,
              "floor": 1
            },
            {
              "classroom": null,
              "x": -594.087415820324,
              "y": -131.82226510604886,
              "radius": 10,
              "color": "#008000",
              "name": "New Node",
              "type": 0,
              "floor": 1
            }
          ],
          "paths": [
            [
              12,
              2,
              119.8368824429201,
              119.8368824429201
            ],
            [
              2,
              0,
              117.73705343492207,
              117.73705343492207
            ],
            [
              2,
              1,
              134.07380684010235,
              134.07380684010235
            ],
            [
              2,
              5,
              156.28046100345458,
              156.28046100345458
            ],
            [
              5,
              4,
              163.94802568028945,
              163.94802568028945
            ],
            [
              4,
              2,
              288.5988795293848,
              288.5988795293848
            ],
            [
              2,
              3,
              285.8841707231712,
              285.8841707231712
            ],
            [
              4,
              10,
              158.67397419590264,
              158.67397419590264
            ],
            [
              3,
              10,
              139.05693483314516,
              139.05693483314516
            ],
            [
              4,
              3,
              262.0067366822265,
              262.0067366822265
            ],
            [
              10,
              9,
              177.03770852003652,
              177.03770852003652
            ],
            [
              9,
              3,
              291.2428995461952,
              291.2428995461952
            ],
            [
              9,
              11,
              145.79648647182546,
              145.79648647182546
            ],
            [
              4,
              7,
              120.0472512868521,
              120.0472512868521
            ],
            [
              8,
              4,
              117.00243614780088,
              117.00243614780088
            ],
            [
              5,
              6,
              124.73744494409827,
              124.73744494409827
            ]
          ],
          "classrooms": [
            "Classroom 1",
            "Classroom 2",
            "Classroom 3",
            "Classroom 4",
            "Classroom 5",
            "Classroom 6",
            "Classroom 7"
          ],
          "gridSettings": {
            "floors": "1",
            "grid": false,
            "gridText": false,
            "gridSnap": false,
            "backGround": false,
            "bgScale": "1",
            "bgOpacity": "0.5",
            "squareSize": 100,
            "gridInside": 4
          }
        }
    let datalist = document.createElement("DATALIST");
    datalist.id = "availableClasses";
    for(classroom of nodemap.classrooms){
        let option = document.createElement("OPTION");
        option.value = classroom;
        datalist.appendChild(option);
    };
    document.getElementById("schedule").appendChild(datalist);
}());

function validateSchool(){
    const schoolInput = document.getElementById('schoolInput');
    const selectedFile = document.getElementById('selectedFile');
    if(menu.schools.indexOf(schoolInput.value) != -1){
        if(menu.progress < 1){
            menu.progress = 1;
            schoolInput.classList.remove('invalid');
            schoolInput.classList.add('valid');
            selectedFile.style.transition = "0s";
            selectedFile.style.backgroundColor = "rgba(0,255,0,0.1)"
            setTimeout(function(){
                if(menu.progress == 1){
                    selectedFile.style.transition = "1s linear";
                    selectedFile.style.backgroundColor = "white";
                    setTimeout(function(){
                        selectedFile.style.transition = "0.2s linear";
                    },1000)
                }
            },1000);
            selectedFile.children[0].style.display='none';
            schoolInput.title="";
            menu.cards.schedule = true;
            addClass();
            enableCard();
            //Get School Data
        }
    }else{
        menu.progress = 0;
        schoolInput.classList.remove('valid');
        selectedFile.style.transition = "0s";
        selectedFile.style.backgroundColor = "white";
        schoolInput.classList.add('invalid');
        selectedFile.children[0].style.display='block';
        schoolInput.title="Please enter a valid school name.";
    }
}
function addClass(){
    let color = menu.possibleColors[menu.colorCounter % 7];
    menu.colorCounter++;
    let period = document.createElement("H2");
    period.innerHTML = 'P' + String(menu.schedule.length+1);
    let room = document.createElement("INPUT");
    room.placeholder = "Class Room";
    room.style.borderLeftColor = color;
    room.setAttribute("list","availableClasses");
    room.addEventListener('input',function(evt){
        for(var i = 0; i<nodemap.nodes.length; i++){
            var node = nodemap.nodes[i];
            if(node.class && evt.target.value.trim() == node.class.trim()){
                let period = evt.target.parentElement.children[0].innerHTML.split('');
                menu.schedule[period[period.length-1]-1].ref = i;
            }
        }
    },false);
    let del = document.createElement("BUTTON");
    let img = document.createElement("IMG");
    img.src = "assets/xButton.png";
    del.appendChild(img);
    del.addEventListener('click',function(evt){
        let period = evt.target.parentElement.children[0].innerHTML.split('');
        menu.schedule.splice(period[period.length-1]-1,1);
        document.getElementById("schedule").removeChild(evt.target.parentElement);
        for(var i = 1; i<=menu.schedule.length;i++){
            console.log('P' + String(i));
            document.getElementById("schedule").children[i-1].children[0].innerHTML = 'P' + String(i);
        };
    },false);
    let newClass = document.createElement("DIV");
    newClass.style.borderColor = color;
    newClass.classList.add("scheduleClass");
    newClass.appendChild(period);
    newClass.appendChild(room);
    newClass.appendChild(del);
    let button = document.getElementById("schedule").children[menu.schedule.length];
    document.getElementById("schedule").insertBefore(newClass, button);
    menu.schedule.push({ref:-1,color:color});
}
