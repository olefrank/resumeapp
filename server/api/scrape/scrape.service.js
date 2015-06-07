'use strict';

var request = require("request"),
    cheerio = require("cheerio"),
    Q = require('q');

// public api
module.exports = {
    getData: function() {
        var defer = Q.defer();
        var $;

        // todo: hide before git commit
        var url = "https://www.linkedin.com/in/olefrankjensen";

        request(url, function(error, response, html) {

            if (!error) {
                $ = cheerio.load(html);
                defer.resolve( extractLinkedin($) );
            }
            else {
                defer.reject(error);
            }
        });

        return defer.promise;
    }
};

function extractLinkedin($) {
    var defer = Q.defer();
    var json = {};

    json.profile = getProfile($);
    json.summary = getSummary($);
    json.experience = getExperience($);
    json.education = getEducation($);
    json.projects = getProjects($);
    json.languages = getLanguages($);
    json.volounteering = getVolounteering($);
    json.skills = getSkills($);

    defer.resolve(json);
    return defer.promise;
}


/**
 * Retrieve personale profile data
 * @param $ Cheerios object
 * Return (Object) Profile data
 */
function getProfile($) {
    var profile = {};

    profile.name = $('.full-name').text();
    profile.imageUrl = $('.profile-picture img').attr('src');

    return profile;
}


/**
 * Retrieve my summary
 * @param $ Cheerios object
 * Return (String) My LinkedIn summary text
 */
function getSummary($) {
    return $('#summary-item-view .description').text().trim();
}


/**
 * Retrieve job experiences
 * @param $ Cheerios object
 * Return (Array) List of experience json objects
 */
function getExperience($) {
    var experiences = [];
    var data;

    // find all experiences
    var experience = $('div').filter(function() {
        if (typeof this.attribs !== "undefined" && typeof this.attribs.id !== "undefined") {
            return this.attribs.id.match(/experience-\d+-view/);
        }
    });

    var company;

    // each experience
    experience.each(function(i, elem) {
        data = $(elem);

        var exp = {};
        exp.title = data.find("header h4 a").text();
        exp.logoUrl = data.find(".experience-logo img").attr("src");

        company = data.find("header h5 a:not(:has(img))").html();
        exp.company = (company !== null && company !== "null" && company !== "") ? company : data.find("header h5 span").text();

        exp.locality = data.find(".locality").text();
        exp.start = data.find(".experience-date-locale time:nth-child(1)").text();
        exp.end = data.find(".experience-date-locale time:nth-child(2)").text();
        exp.description = data.find(".description").text().trim();
        exp.currentPosition = data.parent().hasClass('current-position') ? true : false;

//        console.log(exp);

        experiences.push(exp);
    });

    return experiences;
}

/**
 * Retrieve educations
 * @param $ Cheerios object
 * Return (Array) List of education json objects
 */
function getEducation($) {
    var educations = [];
    var data;

    $('div.education').filter(function() {
        data = $(this);
        var edu = {};

        edu.school = data.find('header h4.summary a').text();
        edu.degree = data.find('header h5 .degree').text();
        edu.major = data.find('header h5 .major').text();
        edu.grade = data.find('header h5 .grade').text();
        edu.start = data.find(".education-date time:nth-child(1)").text();
        edu.end = data.find(".education-date time:nth-child(2)").text();
        edu.end = edu.end.replace(/\D/g,''); // remove all non-digits from date
        edu.activities = [];

        data.find(".activities span").each(function() {
            edu.activities.push($(this).text().trim());
        });

        educations.push(edu);
    });

    return educations;
}


/**
 * Retrieve projects
 * @param $ Cheerios object
 * Return (Array) List of projects I've collaborated on
 */
function getProjects($) {
    var projects = [];
    var data;

    // find all experiences
    var projectElems = $('div').filter(function() {
        if (typeof this.attribs !== "undefined" && typeof this.attribs.id !== "undefined") {
            return this.attribs.id.match(/project-\d+-view/);
        }
    });

    // each experience
    projectElems.each(function(i, elem) {
        data = $(elem);
        var proj = {};

        proj.title = data.find("h4.summary span:first-child").text();
        proj.start = data.find(".projects-date time:nth-child(1)").text();
        proj.end = data.find(".projects-date time:nth-child(2)").text();
        proj.description = data.find(".description").text().trim();

        projects.push(proj);
    });

    return projects;
}


/**
 * Retrieve languagees
 * @param $ Cheerios object
 * Return (Array) List of language json objects
 */
function getLanguages($) {
    var languages = [];
    var data;

    $('#languages-view ol li').each(function () {
        data = $(this);
        var lang = {};
        lang.lang = data.find("h4 span").text();
        lang.proficiency = data.find(".languages-proficiency").text();

        languages.push(lang);
    });

    return languages;
}


/**
 * Retrieve Volounteer work
 * @param $ Cheerios object
 * Return (Array) List of volounteering json objects
 */
function getVolounteering($) {
    var volounteering = [];
    var data;

    // find all volounteering
    var volounteer = $('div').filter(function() {
        if (typeof this.attribs !== "undefined" && typeof this.attribs.id !== "undefined") {
            return this.attribs.id.match(/volunteering-\d+-view/);
        }
    });

    // each volounteer experience
    volounteer.each(function(i, elem) {
        data = $(elem);
        var vol = {};

        vol.title = data.find("h4 span").text();
        vol.logo = data.find(".volunteering-logo img").attr("src");
        vol.company = data.find("h5 a[href^='/company/']").text();
        vol.start = data.find(".volunteering-date-cause time:nth-child(1)").text();
        vol.end = data.find(".volunteering-date-cause time:nth-child(2)").text();
        vol.end = vol.end.replace(/\D/g,''); // remove all non-digits from date
        vol.description = data.find(".description").text().trim();
        vol.cause = data.find(".volunteering-date-cause .locality").text();

        volounteering.push(vol);
    });

    return volounteering;
}

/**
 * Retrieve Skills
 * @param $ Cheerios object
 * Return (Array) List of skills
 */
function getSkills($) {
    var skills = [];
    var data;

    $('.skills-section li').each(function() {
        data = $(this);
        var skill = {};

        skill.title = data.find("a").text();
        skill.rating = 5;

        // only include real skills
        if ( skill.title.indexOf("See less" !== -1 )) {
            skills.push(skill);
        }
    });

    return skills;
}

//function tests($) {
//    var result = true;
//
//    // profile
//    var fullname = $('.full-name');
//    result = $('.full-name').is('span');
//
//    var profilePicContainer = $('.profile-picture').get(0);
//    var profilePicImage = $('.profile-picture img').get(0);
//    result = $.contains(profilePicContainer, profilePicImage);
//    console.log(result);
//
//
//    // summary
//    result = $('#summary-item-view .description').is('p');
//
//
//    // experience
//    // find all experiences
//    var experience = $('div').filter(function() {
//        if (typeof this.attribs !== "undefined" && typeof this.attribs.id !== "undefined") {
//            return this.attribs.id.match(/experience-\d+-view/);
//        }
//    });
//    var data = $(experience[0]);
//    result = data.find("header h4 a").length > 0;
//    result = data.find(".experience-logo img").length > 0;
//    result = data.find("h5 a[href^='/company/']");
//    result = data.find(".locality");
//    result = data.find(".experience-date-locale time:nth-child(1)");
//    result = data.find(".experience-date-locale time:nth-child(2)");
//    result = data.find(".description");
//
//
//    // education
//    $('div.education header h4.summary a');
//    $('div.education header h5 .degree');
//    $('div.education header h5 .major');
//    $('div.education header h5 .grade');
//    $('div.education .education-date time:nth-child(1)');
//    $('div.education .education-date time:nth-child(2)');
//    $('div.education .activities span');
//
//
//    // projects
//    var projectElems = $('div').filter(function() {
//        if (typeof this.attribs !== "undefined" && typeof this.attribs.id !== "undefined") {
//            return this.attribs.id.match(/project-\d+-view/);
//        }
//    });
//    var data = $(projectElems[0]);
//    data.find("h4.summary span:first-child");
//    data.find(".projects-date time:nth-child(1)");
//    data.find(".projects-date time:nth-child(2)");
//    data.find(".description");
//
//
//    // language
//    $('#languages-view ol li h4 span');
//    $('#languages-view ol li .languages-proficiency');
//
//
//    // courses
//    $('#courses-view .section-item h4 a');
//    $('#courses-view .section-item .courses-listing li');
//
//
//    // volounteering
//    var volounteer = $('div').filter(function() {
//        if (typeof this.attribs !== "undefined" && typeof this.attribs.id !== "undefined") {
//            return this.attribs.id.match(/volunteering-\d+-view/);
//        }
//    });
//    volounteer.length > 0
//    var data = $(volounteer[0]);
//    data.find("h4 span");
//    data.find(".volunteering-logo img");
//    data.find("h5 a[href^='/company/']");
//    data.find(".volunteering-date-cause time:nth-child(1)");
//    data.find(".volunteering-date-cause time:nth-child(2)");
//    data.find(".description");
//    data.find(".volunteering-date-cause .locality");
//
//
//    // skills
//    $('.skills-section li a');
//
//    return result;
//}
