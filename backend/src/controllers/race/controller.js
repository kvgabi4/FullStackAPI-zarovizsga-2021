const express = require('express');
const createError = require('http-errors');

const Model = require('../../models/race.model');
const race = require('./race');

// Create a new race.
exports.create = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return race.create(req.body)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return race.findAll()
        .then( list => {
            res.json(list);
        });
};

exports.findOne = (req, res, next) => {
    return race.findOne(req.params.id)
        .then( entity => {
            if (!entity) {
                return next(new createError.NotFound("Race is not found"));
            }
            return res.json(entity);
        });
};

exports.update = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return race.update(req.params.id, req.body)
        .then(entity => {
            res.json(entity);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return race.delete(req.params.id)
        .then( () => res.json({}) )
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        } );
};
