<script lang="ts">
  import { get } from 'svelte/store';
  import { onMount } from 'svelte'
  import { startGame } from '../../../controller/game'
  import { hash } from '../../../controller/router'
  import { loadAll } from '../../../controller/loader'
  import { level } from '../../../controller/settings'
  import { Level } from '../../../model'
  import { levelKey, gameSectionId } from '../../../../settings.json'

  let levelsForm: HTMLFormElement, modal

  function saveLevel(){
    const { value } = levelsForm.level
    localStorage.setItem(levelKey, value)
    level.set(value)
    modal.hide()
    loadAll()
    if(get(hash) === gameSectionId) startGame()
  }

  function isCurrent(level){
    return level === localStorage.getItem(levelKey)
  }

  onMount(()=>{
    const {Modal} = window['bootstrap']
    modal = new Modal(modal)
  })
</script>
<a type="link" class="link-light" data-bs-toggle="modal" data-bs-target="#choose-level" href="#choose-level-link">
  Выбрать уровень
</a>

<div class="modal fade text-start" id="choose-level" tabindex="-1" aria-labelledby="choose-level-label" aria-hidden="true" bind:this={modal}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="choose-level-label">Выберите уровень сложности</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        <form bind:this={levelsForm}>
        {#each Level.getKeysWithLabels() as item}
          <div class="form-check">
            <input class="form-check-input" type="radio" name="level" value={item.key} id={`level-${item.key}`} checked={isCurrent(item.key)}>
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
