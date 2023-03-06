// const Dropdown =  require('../components/Dropdown.vue')
import Dropdown  from "../components/Dropdown.vue"
import { mount, shallowMount  } from '@vue/test-utils'
import { test, describe, expect } from 'vitest'

describe('', () => {
    test("Test for dropdown", () => {
        const wrapper = mount(Dropdown, {
            props: {
                name: "Basket",
                selectKey: "basket",
                options: ["apple", "pear", "orange"],
                displayOption: null
            }
        })
        wrapper.find('button').trigger('click')
        expect(wrapper.text()).toContain('apple')
        expect(wrapper.find("Basket")).toBe(false)
    })    
})
