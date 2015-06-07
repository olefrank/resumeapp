'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var profile = {
    name: String,
    imageUrl: String
};

var experienceObj = {
    "title": String,
    "logoUrl": String,
    "company": String,
    "locality": String,
    "start": String,
    "end": String,
    "description": String,
    "currentPosition": Boolean
};

var educationObj = {
    "school": String,
    "degree": String,
    "major": String,
    "grade": String,
    "start": String,
    "end": String,
    "activities": []
};

var projectObj = {
    "title": String,
    "start": String,
    "end": String,
    "description": String
};

var languageObj = {
    "lang": String,
    "proficiency": String
};

var volounteerObj = {
    "title": String,
    "logo": String,
    "company": String,
    "start": String,
    "end": String,
    "description": String,
    "cause": String
};

var skillObj = {
    "title": String,
    "rating": Number
};

var ScrapeSchema = new Schema({
    profile: profile,
    summary: String,
    experience: [experienceObj],
    education: [educationObj],
    projects: [projectObj],
    languages: [languageObj],
    volounteering: [volounteerObj],
    skills: [skillObj]
});

module.exports = mongoose.model('Scrape', ScrapeSchema);