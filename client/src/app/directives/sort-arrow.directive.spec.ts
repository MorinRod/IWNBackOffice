/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SortArrowDirective } from './sort-arrow.directive';
import {Directive, ElementRef, Input, OnInit} from '@angular/core';

describe('SortArrowDirective', () => {
  it('should create an instance', () => {
    let directive = new SortArrowDirective(new ElementRef(''));
    expect(directive).toBeTruthy();
  });
});
