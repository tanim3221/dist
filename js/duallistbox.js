function duallistbox(select) {
    if (select.previousElementSibling && select.previousElementSibling.id === `duallistbox_${select.id}`) {
        select.previousElementSibling.remove()
    }
    select.style.display = 'none'
    select.querySelectorAll('option').forEach((o, i) => o.dataset.index = i)

    // icons for 'move all' & 'remove all' buttons
    const icon = path => `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1.375em" height="1.375em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`
    const iconR = icon('M13 17l5-5-5-5M6 17l5-5-5-5') // right
    const iconL = icon('M11 17l-5-5 5-5M18 17l-5-5 5-5') // left

    const template = `
          <div class="duallistbox row" id="duallistbox_${select.id}">
            <div class="col-md-4">
            <label> All Data</label>
              <input type="text" class="form-control form-control-sm" placeholder="Filter">
              <select class="form-control data_show_view__" id="${select.id}_1" multiple></select>
            </div>
            <div class="col-md-4 button_move_select">
                         <div class="btn-group-sm btn-group" role="group">
                <button class="btn btn-success btn-flat move-all" type="button">Select all</button>
                <button class="btn btn-danger btn-flat remove-all" type="button">Remove all</button>
              </div>
              
              <div class="form-group full_message_body_bulk">
                        <textarea type="text" name="full_msg" placeholder="Write message body..." rows="10" id="bulk_msg" class="form-control"></textarea>
                    </div>
                    
                    <button class="btn btn-success btn-flat send_bulk_mail" type="button">
              <i class="fa fa-check-square-o"></i>
              <span class="send_email_sms">Send</span>
              <span class="sending_email_sms display_none">Sending...</span>
              </button>
            </div>
            <div class="col-md-4">
            <label> Selected</label>
              <input type="text" class="form-control form-control-sm" placeholder="Filter">
              <select class="form-control data_show_view__" id="${select.id}_2" multiple></select>
            </div>
          </div>
        `
    select.insertAdjacentHTML('beforebegin', template)

    const wrapper = document.getElementById(`duallistbox_${select.id}`)
    const select1 = document.getElementById(`${select.id}_1`)
    const select2 = document.getElementById(`${select.id}_2`)
    const filters = wrapper.querySelectorAll('input')

    // fill
    select1.innerHTML = [...select.querySelectorAll('option:not(:checked)')].map(o => o.outerHTML).join('')
    select2.innerHTML = [...select.querySelectorAll('option:checked')].map(o => o.outerHTML).join('').replace(/selected=""/g, '')

    // show only filtered options
    const filter = (target = '') => {
        if (target !== '') {
            const options = target.nextElementSibling.querySelectorAll('option') // find options
            options.forEach(o => o.removeAttribute('hidden')) // show all options
            options.forEach(o => {
                if (o.textContent.toLowerCase().indexOf(target.value.toLowerCase()) === -1) {
                    o.setAttribute('hidden', true) // hide unmatched
                }
            })
        } else {
            filters.forEach(input => filter(input))
        }
    }
    filters.forEach(input => input.addEventListener('keyup', () => filter(input))) // filter on keyup

    // re-sort options
    const resort = () => {
        [select1, select2].forEach(el => {
            el.innerHTML = [...el.options].sort((a, b) => a.dataset.index - b.dataset.index).map(o => o.outerHTML).join('')
        })
    }

    // move selected
    const move = (src, dst, all = true) => {
        const selected = all ? src.querySelectorAll('option:not([hidden]):not([disabled])') : src.selectedOptions
        dst.insertAdjacentHTML('beforeend', [...selected].map(o => { o.remove(); return o.outerHTML }).join(''))
        resort() // re-sort options after moved
        update() // update original select element
    }

    // move or remove selected
    select1.addEventListener('change', () => move(select1, select2, false))
    select2.addEventListener('change', () => move(select2, select1, false))

    // move or remove all
    const toggle = set => {
        set ? move(select1, select2, true) : move(select2, select1, true)
        filter() // keep filtered options
    }
    wrapper.addEventListener('click', e => {
        if (e.target.closest('.move-all')) toggle(true)
        if (e.target.closest('.remove-all')) toggle(false)
    })

    // update original select element
    const update = () => {
        const selectedBefore = [...select.selectedOptions].map(o => o.dataset.index)
        const selectedAfter = [...select2.options].map(o => o.dataset.index)
        if (selectedBefore.join('') !== selectedAfter.join('')) {
            select.querySelectorAll('option').forEach(o => {
                selectedAfter.includes(o.dataset.index) ? o.selected = true : o.selected = false
            })
            select.dispatchEvent(new Event('change')) // trigger change event
        }
    }
}