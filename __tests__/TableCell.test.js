import { TableCell } from "~~/.nuxt/components"

import { mount, shallowMount  } from '@vue/test-utils'

// import {expect, describe, jest, test} from '@jest/globals';
test("Test for progress blue bubble", () => {
    const wrapperInProgress = mount(TableCell, {
        props: {
            data: "In progress"
        }
    })
    expect(wrapperInProgress.text()).toContain('In progress')
    expect(wrapperInProgress.html()).toContain('text-blue-900')
})

test("Test for failed red bubble", () => {
    const wrapperFailed = mount(TableCell, {
        props: {
            data: "Failed"
        }
    })
    expect(wrapperFailed.text()).toContain('Failed')
    expect(wrapperFailed.html()).toContain('text-red-900')
})
 
test("Test for success green bubble", () => {
    const wrapperSuccess = mount(TableCell, {
        props: {
            data: "Success"
        }
    })
    expect(wrapperSuccess.text()).toContain('Success')
    expect(wrapperSuccess.html()).toContain('text-green-900')
})

test("Test for cancelled yellow bubble", () => {
    const wrapperCancelled = mount(TableCell, {
        props: {
            data: "Cancelled"
        }
    })
    expect(wrapperCancelled.text()).toContain('Cancelled')
    expect(wrapperCancelled.html()).toContain('text-yellow-900')
})

test("Test for normal table cell", () => {
    const wrapperCancelled = mount(TableCell, {
        props: {
            data: "some text"
        }
    })
    expect(wrapperCancelled.text()).toContain('some text')
    expect(wrapperCancelled.find('text-yellow-900')).toBe(false)
    expect(wrapperCancelled.find('text-green-900')).toBe(false)
    expect(wrapperCancelled.find('text-blue-900')).toBe(false)
    expect(wrapperCancelled.find('text-red-900')).toBe(false)
})