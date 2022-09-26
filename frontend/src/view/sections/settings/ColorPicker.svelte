<script>
        function changeStroke(e){
            e.target.closest('section').querySelectorAll('svg').forEach(element => {
                element.style.fill = 'red'
            });
            //document.getElementById('result').style.backgroundColor = 'rgb(' + document.getElementById("OutputIdRed").value + ',' + document.getElementById("OutputIdGreen").value + ',' + document.getElementById("OutputIdBlue").value + ')';
        }

        let redInput, greenInput, blueInput = 127
</script>

<div class="container">
    <div class="row">
        <div class="col-md-4 col-lg-4 p-5">
            <p class="text-center">Красный</p>
            <input type="range" class="form-range" min="0" max="255" step="1" 
                on:input={e => redInput = e.target.value} 
                on:change={changeStroke}
                value={127}>
        </div>
        <div class="col-md-4 col-lg-4 p-5">
            <p class="text-center">Зеленый</p>
            <input type="range" class="form-range" min="0" max="255" step="1" on:input={e => greenInput = e.target.value} value={127}>
        </div>
        <div class="col-md-4 col-lg-4 p-5">
            <p class="text-center">Синий</p>
            <input type="range" class="form-range" min="0" max="255" step="1" on:input={e => blueInput = e.target.value} value={127}>
        </div>
        <!-- div class="col-md-4 col-lg-4 p-5">
            <p class="text-center text-white">Зеленый</p>
            <input type="range" class="form-range" min="0" max="255" step="1" id="customRange2" on:input='OutputIdGreen.value = customRange2.value' onchange="changebackground()">
            <output class="text-center text-white" style="display: block;" id="OutputIdGreen">127</output>
        </div>
        <div class="col-md-4 col-lg-4 p-5">
            <p class="text-center text-white">Синий</p>
            <input type="range" class="form-range" min="0" max="255" step="1" id="customRange3" oninput='OutputIdBlue.value = customRange3.value' onchange="changebackground()">
            <output class="text-center text-white" style="display: block;" id="OutputIdBlue">127</output>
        </div -->
    </div>
</div>