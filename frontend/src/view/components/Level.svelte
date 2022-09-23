<script>
    import { onMount } from 'svelte'
    import { setLevels, levelIsSetup } from '../../controller/game'
    const { Modal } = window['bootstrap']

    let levels, confirm, modal

    onMount(() => {
      /*if(levelIsSetup()) return
      modal = new Modal(levels)
      setLevels(() => new Promise((yep, nop) => {
        confirm.addEventListener('click', ()=>{ 
          yep(true)
        })
        modal.show()
      }))*/
    })
</script>

<div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" bind:this={confirm}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
  