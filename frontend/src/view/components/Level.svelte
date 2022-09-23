<script lang="ts">
  import { onMount } from 'svelte'
  import { loadAll } from '../../controller/loader'
  import { level, getKeysWithLabels } from '../../controller/level'
  import { levelKey } from '../../../settings.json'

  let levelsForm: HTMLFormElement, modal

  function saveLevel(){
    const { value } = levelsForm.level
    localStorage.setItem(levelKey, value)
    level.set(value)
    modal.hide()
    loadAll()
  }

  onMount(()=>{
    const {Modal} = window['bootstrap']
    modal = new Modal(modal)
  })
</script>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#choose-level">
  Выбрать уровень
</button>

<div class="modal fade" id="choose-level" tabindex="-1" aria-labelledby="choose-level-label" aria-hidden="true" bind:this={modal}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="choose-level-label">Выберите уровень сложности</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        <form bind:this={levelsForm}>
        {#each getKeysWithLabels() as item, index}
          <div class="form-check">
            <input class="form-check-input" type="radio" name="level" value={item.key} id={`level-${item.key}`}>
            <label class="form-check-label" for={`level-${item.key}`}>
              {item.label}
            </label>
          </div>
        {/each}
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" on:click={saveLevel}>Выбрать</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
      </div>
    </div>
  </div>
</div>
