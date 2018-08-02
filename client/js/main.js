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
        screenBeingDragged: false,
        transitions: []
    }
    map.canvas.width = map.w;
    map.canvas.height= map.h;
    map.ctx = map.canvas.getContext('2d');
    map.currentOrigin = {x:(map.w/2)-320,y:(map.h/2)-25,scale:1};
    map.img.src = "assets/select.png";
    //Get school data
    menu = {
        menuEnabled:true,
        cards:{
            selectedFile:true,
            schedule:false,
            options:false,
            generate:false,
            transitions:false,
            stats:false,
            again:false
        },
        infos:{
            contact:'Contact Us at this random site',
            about:'This was made by 2 guys'
        },
        iCard:0,
        contact_about:false,
        schools: [],
        progress:0,
        schedule:[],
        colorCounter: 0,
        possibleColors:["#ff595e","#f79256","#ffca3a","#8ac926","#1982c4","#6a4c93","#565554"]
    }
    fetch(window.location.href + 'schools')
    .then(function(res){ return res.text() })
    .then(function(data){
        var schoolData = JSON.parse(data);
        var datalist = document.getElementById('schools');
        for(school of schoolData){
            menu.schools.push(school.name);
            var option = document.createElement('OPTION');
            option.value = school.name;
            datalist.append(option);
        }
    });
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
            enableCard();
            //Get School Data
            let schoolQuery = schoolInput.value.trim().replace().split(' ').join('+');
            fetch(window.location.href + 'schools?school='+schoolQuery)
            .then(function(res){return res.json()})
            .then(function(data){
                nodemap = data.nodemap;
                map.img.src = 'assets/'+data.imagePath;
                let datalist = document.getElementById("availableClasses");
                while (datalist.firstChild) {
                    datalist.removeChild(myNode.firstChild);
                }
                for(classroom of nodemap.classrooms){
                    let option = document.createElement("OPTION");
                    option.value = classroom;
                    datalist.appendChild(option);
                };
            });
        }
    }else{
        menu.progress = 0;
        schoolInput.classList.remove('valid');
        selectedFile.style.transition = "0s";
        selectedFile.style.backgroundColor = "white";
        schoolInput.classList.add('invalid');
        selectedFile.children[0].style.display='block';
        schoolInput.title="Please enter a valid school name.";
        menu.cards.schedule = false;
        menu.cards.options = false;
        menu.cards.generate = false;
        disableFalseCards();
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
        let ref = false;
        for(var i = 0; i<nodemap.nodes.length; i++){
            var node = nodemap.nodes[i];
            if(node.class && evt.target.value.trim() == node.class.trim()){
                let period = evt.target.parentElement.children[0].innerHTML.split('');
                menu.schedule[period[period.length-1]-1].ref = i;
                ref = true;
            }
        }
        if(!ref){
            let period = evt.target.parentElement.children[0].innerHTML.split('');
            menu.schedule[period[period.length-1]-1].ref = -1;
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
            document.getElementById("schedule").children[i-1].children[0].innerHTML = 'P' + String(i);
        };
        if(menu.schedule.length < 2 && menu.progress > 1){
            menu.cards.options = false;
            menu.cards.generate = false;
            disableFalseCards();
        }
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
    if(menu.schedule.length > 1 && menu.progress < 2){
        menu.progress = 2;
        menu.cards.options = true;
        menu.cards.generate = true;
        enableCard();
    }
}
function pathAlgo(){
    let valid = true;
    for(classroom of menu.schedule){
        if(classroom.ref == -1){
            valid = false;
        }
    }
    if(valid){
        for(var i = 0; i<menu.schedule.length-1;i++){
            let start = menu.schedule[i].ref;
            let end = menu.schedule[i+1].ref;
            for(let node of nodemap.nodes){
                node.visited = false;
                node.score = Number.MAX_SAFE_INTEGER;
                node.pathTo = [];
            }
            let found = false;
            nodemap.nodes[start].score = 0;
            let currentNode = start;
            while(currentNode != end){
                nodemap.nodes[currentNode].visited = true;
                let neighbors = [];
                for(let path of nodemap.paths){
                    let neighbor = false;
                    if(path[0] == currentNode && !nodemap.nodes[path[1]].visited){
                        neighbor = path[1];

                    }else if(path[1] == currentNode && !nodemap.nodes[path[0]].visited){
                        neighbor = path[0];
                    }
                    if(neighbor !== false){
                        if(path[2] + nodemap.nodes[currentNode].score < nodemap.nodes[neighbor].score){
                            nodemap.nodes[neighbor].score = path[2] + nodemap.nodes[currentNode].score;
                            nodemap.nodes[neighbor].pathTo = nodemap.nodes[currentNode].pathTo.concat([neighbor]);
                        }
                        neighbors.push(neighbor);
                    }
                }
                let lowestScore = Number.MAX_SAFE_INTEGER;
                let lowestRef = -1;
                for(var iii = 0; iii<nodemap.nodes.length; iii++){
                    let node = nodemap.nodes[iii];
                    if(!node.visited && node.score < lowestScore){
                        lowestScore = node.score;
                        lowestRef = iii;
                    }
                }
                currentNode = lowestRef;
            }
            console.log('FINISHED', nodemap.nodes[end].pathTo);
            map.transitions.push([start].concat(nodemap.nodes[end].pathTo));
        }
        menu.cards =  {
            selectedFile:true,
            schedule:false,
            options:false,
            generate:false,
            transitions:true,
            stats:true,
            again:true
        }
        document.getElementById('schedule').classList.add('disp');
        document.getElementById('options').classList.add('disp');
        document.getElementById('generate').classList.add('disp');
        document.getElementById('transitions').classList.remove('disp');
        document.getElementById('stats').classList.remove('disp');
        document.getElementById('again').classList.remove('disp');
        disableFalseCards();
        enableCard();
    }else{
        alert('Your schedule is not valid');
    }
}
