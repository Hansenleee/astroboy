import { Loader } from '../core/Loader';
import { IInnerApplication } from '../definitions/core';
import { IOptions } from '../definitions/config';

const requestProto = require('koa/lib/request');
const responseProto = require('koa/lib/response');
const contextProto = require('koa/lib/context');
const applicationProto = require('koa/lib/application').prototype;
const completeAssign = require('complete-assign');

class AstroboyExtendLoader extends Loader<Partial<IOptions>, IInnerApplication<Partial<IOptions>>> {
  load() {
    // application extend
    this.globDirs(this.config.applicationPattern || [], entries => {
      entries.forEach(entry => {
        completeAssign(applicationProto, require(entry as string));
      });
    });

    // context extend
    this.globDirs(this.config.contextPattern || [], entries => {
      entries.forEach(entry => {
        completeAssign(contextProto, require(entry as string));
      });
    });

    // request extend
    this.globDirs(this.config.requestPattern || [], entries => {
      entries.forEach(entry => {
        completeAssign(requestProto, require(entry as string));
      });
    });

    // response extend
    this.globDirs(this.config.responsePattern || [], entries => {
      entries.forEach(entry => {
        completeAssign(responseProto, require(entry as string));
      });
    });
  }
}

export = AstroboyExtendLoader;
