<script lang="ts">
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { level } from "../../../controller/settings";
  import { Level } from "../../../model";
  import { breakGame } from "../../../controller/tickers";
  import { showLoader, processHash } from "../../../controller/router";
  import { loadLevel } from "../../../controller/loader";

  let levelsForm: HTMLFormElement, modal;
  export let id: string;

  function saveLevel() {
    const { value } = levelsForm.level;
    level.set(value);
    modal.hide();
  }

  function isCurrent($level) {
    return $level === get(level);
  }

  onMount(() => {
    const { Modal } = window["bootstrap"];
    modal = new Modal(modal);
  });
</script>

<slot name="button" />

<div
  class="modal fade text-start"
  id={`choose-level-${id}`}
  tabindex="-1"
  aria-labelledby="choose-level-label"
  aria-hidden="true"
  bind:this={modal}
>
  <div class="modal-dialog">
    <div class="modal-content" style="width: 640px">
      <div class="modal-header">
        <h5 class="modal-title" id="choose-level-label">
          Выберите уровень сложности
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Закрыть"
        />
      </div>
      <div class="modal-body">
            <form bind:this={levelsForm}>
              <div class="all-levels">

              <div class="single-level">
                {#each Level.getKeysWithLabels().filter(el => el.key.startsWith('CLASS_5')) as item}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="level"
                    value={item.key}
                    id={`level-${item.key}`}
                    checked={isCurrent(item.key)}
                  />
                  <label class="form-check-label" for={`level-${item.key}`}>
                    {item.label}
                  </label>
                </div>
              {/each}
            </div>
            <div class="single-level">
              {#each Level.getKeysWithLabels().filter(el => el.key.startsWith('CLASS_6')) as item}
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="level"
                  value={item.key}
                  id={`level-${item.key}`}
                  checked={isCurrent(item.key)}
                />
                <label class="form-check-label" for={`level-${item.key}`}>
                  {item.label}
                </label>
              </div>
            {/each}
          </div>
          <div class="single-level">
            {#each Level.getKeysWithLabels().filter(el => el.key.startsWith('CLASS_7')) as item}
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="level"
                value={item.key}
                id={`level-${item.key}`}
                checked={isCurrent(item.key)}
              />
              <label class="form-check-label" for={`level-${item.key}`}>
                {item.label}
              </label>
            </div>
          {/each}
        </div>
      </div>

          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" on:click={saveLevel}
          >Выбрать</button
        >
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          >Закрыть</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .all-levels {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
