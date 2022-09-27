<script type="ts">
    import Color from './Color.svelte'
    import { toStorage } from '../../../controller/util'
    import { red, green, blue } from '../../../controller/settings'
    import { redKey, greenKey, blueKey } from '../../../../settings.json'
</script>

<h2>Выбор цвета</h2>
<div class="row">
    <Color label="Красный" key={redKey} writable={red} />
    <Color label="Зеленый" key={greenKey} writable={green} />
    <Color label="Синий" key={blueKey} writable={blue} />
</div>
