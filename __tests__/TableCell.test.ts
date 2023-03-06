import TableCell from "../components/TableCell.vue"

import { mount, shallowMount  } from '@vue/test-utils'
import { test, describe, expect } from 'vitest'


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
    const wrapper = mount(TableCell, {
        props: {
            data: "some text"
        }
    })
    debugger
    expect(wrapper.text()).toContain('some text')
    expect(wrapper.html().includes('text-yellow-900')).toBe(false)
    expect(wrapper.html().includes('text-green-900')).toBe(false)
    expect(wrapper.html().includes('text-blue-900')).toBe(false)
    expect(wrapper.html().includes('text-red-900')).toBe(false)
})