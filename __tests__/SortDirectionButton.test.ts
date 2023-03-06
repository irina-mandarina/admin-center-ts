import SortDirectionButton from "../components/SortDirectionButton.vue"
import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'

test("Test for changing the sort direction button on click", () => {
    const wrapperAsc = mount(SortDirectionButton, {
        props: {
            sortDir: "asc"
        }
    })
    expect(wrapperAsc.html()).toContain('fa fa-chevron-up')

    const wrapperDesc = mount(SortDirectionButton, {
        props: {
            sortDir: "desc"
        }
    })
    expect(wrapperDesc.html()).toContain('fa fa-chevron-down')
    
    const wrapperNoDir = mount(SortDirectionButton, {
        props: {
            sortDir: "any string"
        }
    })
    expect(wrapperNoDir.html()).toContain('invisible')
})