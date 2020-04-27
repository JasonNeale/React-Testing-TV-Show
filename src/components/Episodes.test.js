// https://github.com/testing-library/jest-dom

import React from 'react'
import {render } from "@testing-library/react"
import { testData } from '../testData'
import Episodes from './Episodes'

test("Renders Episodes without crashing.", () => { render(<Episodes episodes={[]} />)})

test("Render list of episodes.", () => {
    const { queryAllByTestId, debug } = render(<Episodes episodes={[]}/>);

    expect(queryAllByTestId(/episopdesTest/i)).toHaveLength(1);

    debug()
}) 