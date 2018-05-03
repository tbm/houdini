// License: LGPL-3.0-or-later
import * as React from 'react';
import 'jest';
import {shallow,render} from 'enzyme'
const TestRenderer = require('react-test-renderer')
import StandardFieldComponent from './StandardFieldComponent'

describe('StandardFieldComponent', () => {
    test('works with no children', () => {
        var field = TestRenderer.create((<StandardFieldComponent inError={false} />)).toJSON()


        expect(field).toMatchSnapshot()
    })
    test('works with a child', () => {
        var field = TestRenderer.create(<StandardFieldComponent inError={false}><input/></StandardFieldComponent>);

        expect(field).toMatchSnapshot()
    })

    test('sets error message properly', () => {
        var field = TestRenderer.create(<StandardFieldComponent inError={true} error={"Something more"}><input/></StandardFieldComponent>);

        expect(field).toMatchSnapshot()
    })
})