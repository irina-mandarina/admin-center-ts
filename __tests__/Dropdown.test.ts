// const Dropdown =  require('../components/Dropdown.vue')
import Dropdown  from "../components/Dropdown.vue"
import { mount, shallowMount  } from '@vue/test-utils'
import { test, expect } from 'vitest'

test("Test for dropdown showing items on click", () => {
    const wrapper = mount(Dropdown, {
        props: {
            name: "Basket",
            selectKey: "basket",
            options: ["apple", "pear", "orange"],
            displayOption: null
        }
    })

    expect(wrapper.text()).toContain('Basket')
    // const t = wrapper.html()
    wrapper.find('button').trigger('focus-in')
const wem = wrapper.emitted()

    expect(wem).toContain('apple')
})    
