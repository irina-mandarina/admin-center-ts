import { SortDirectionButton } from "~~/.nuxt/components"
import { mount } from '@vue/test-utils'

// import {expect, describe, jest, test} from '@jest/globals';

test("Test for table cell", () => {
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