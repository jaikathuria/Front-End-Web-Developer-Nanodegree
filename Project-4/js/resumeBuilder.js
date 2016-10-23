var bio = {
    "name": "Jai Kathuria",
    "role": "Web Developer",
    "contacts": {
        "mobile": "8427611077",
        "email": "jaikathuria@live.com",
        "github": "jaikathuria",
        "location": "sangrur"
    },
    "welcomeMessage": "Education is the most powerful weapon which you can use to change the world.",
  "skills": ["Software Engineering", "Php", "HTML5", "CSS3", "JavaScript", "Python", "Flask", "C", "C++"],
  "biopic": "images/biopic.jpg"
};
var education = {
  "schools": [
    {"name": "Chitkara University",
     "location": "Rajpura, Punjab",
     "degree": "Software Engineering",
     "majors": ["Computer Science,","Designing"],
     "dates": "2016",
     "url": "http://www.chitkara.edu.in/"

    }
  ],
  "onlineCourses": [
    {"title": "Front-End Nanodegree",
     "school": "Udacity",
     "date": 2016,
     "url": "http://www.udacity.com"
    }
  ]
};

var projects = {
    "projects": [
        
        {
            "title": "Questionnaire",
            "dates": "2015",
            "description": "mnbvcxz qwertyuiop lkjhgfdsa",
            "images": ["images/Capture3.png"]
            
        },
        {
            "title": "Regulator",
            "dates": "2016",
            "description": "wsxedcrfvtgb yhn ujm kk",
            "images": ["images/Capture1.png"]
            
        },
        {
            "title": "#Hashtag",
            "dates": "2016",
            "description": "hchjvchjscvhj hjcfhje  kjdsb  d   dbdbd",
            "images": ["images/Capture2.png"]
            
        }
    ]
};
var work = {
  "jobs": [
    {"employer": "Skyer",
     "title": "CEO",
     "location": "sangrur",
     "dates": "2015 onwards",
     "description": "Platform to revolutionaries indian eduction system"
    },
    {"employer": "Toastmasters Chitkara University",
     "title": "Web Master",
     "location": "chandigarh",
     "dates": "2016",
     "description": "Dealing with all web activities of chitkara university Toastmaster Club."
    }
  ]
};

function appendObjects(placeHolder,valuePlaceHolder,object,position,formatter){
    for(var key in object){
        var data = formatter.replace(placeHolder,key).replace(valuePlaceHolder,object[key]);
        $(position).append(data);
    }
}
function appendObjectList(list,valuePlaceHolder,postion,formatter){
    for(var key in list){
        var data = formatter.replace(valuePlaceHolder,list[key]);
        $(postion).append(data);
    }
}
function replaceValue(value,formatter,placeHolder){
    placeHolder = placeHolder || "%data%";
    return formatter.replace("%data%",value);
}
/*Object Display Functions*/
bio.display = function(name,role){
    name = replaceValue(bio.name,HTMLheaderName);
    role = replaceValue(bio.role,HTMLheaderRole);
    $("#header").prepend(HTMLskillsStart)
                .prepend(replaceValue(bio.biopic, HTMLbioPic))
                .prepend(role)
                .prepend(name)
                .append(replaceValue(bio.welcomeMessage, HTMLWelcomeMsg));
                
    appendObjects("%contact%","%data%",bio.contacts,"#topContacts",HTMLcontactGeneric);
    appendObjectList(bio.skills,"%data%","#skills",HTMLskills);
    $("#topContacts").children().clone().appendTo("#footerContacts");
};
education.display = function(){
    $("#education").append(HTMLschoolClasses);
    for (var i in education.schools) {
      $("#education").append(replaceValue(i, HTMLschoolStart));
      var id = "#school-entry-" + i;
      var school = education.schools[i];
      $(id).append((replaceValue(school.name, HTMLschoolName) + replaceValue(school.degree, HTMLschoolDegree))
           .replace("#", school.url))
           .append(replaceValue(school.dates, HTMLschoolDates))
           .append(replaceValue(school.location, HTMLschoolLocation))
           .append(replaceValue(school.majors, HTMLschoolMajor));
    }

    $("#education").append(HTMLonlineClasses);
    for (var j in education.onlineCourses) {
      $("#education").append(replaceValue(j, HTMLonlineStart));
      var id = "#online-entry-" + j;
      var online = education.onlineCourses[j];
      $(id).append(replaceValue(online.title, HTMLonlineTitle) + replaceValue(online.school, HTMLonlineSchool))
           .append(replaceValue(online.date, HTMLonlineDates))
           .append(replaceValue(online.url, HTMLonlineURL).replace("#", online.url));
    }
  };
projects.display = function(){
    for(var i in projects.projects){
        $("#projects").append(HTMLprojectStart);
        var project = projects.projects[i];
        $(".project-entry:last").append(replaceValue(project.title,HTMLprojectTitle))
           .append(replaceValue(project.dates, HTMLprojectDates))
           .append(replaceValue(project.description, HTMLprojectDescription));
      for (var j in project.images) {
        $(".project-entry:last").append(replaceValue(project.images[j], HTMLprojectImage));
      }
    }
};

work.display = function(){
     for(var i in work.jobs){
        $("#workExperience").append(HTMLworkStart);
        var works = work.jobs[i];
        $(".work-entry:last").append(replaceValue(works.employer,HTMLworkEmployer))
           .append(replaceValue(works.title,HTMLprojectTitle))
           .append(replaceValue(works.dates, HTMLprojectDates))
           .append(replaceValue(works.location,HTMLworkLocation))
           .append(replaceValue(works.description, HTMLprojectDescription))
           .append("</hr>");
           
     }
}
bio.display();

education.display();

projects.display();

work.display();

$("#mapDiv").append(googleMap);
