<script>

    export let item

</script>

<style>
  :root {
    --morphomino-card-width: 250px;
  }

  @media (max-width: 850px) {
    :root {
      --morphomino-card-width: 180px;
    }
  } 
  @media (max-width: 400px) {
    :root {
      --morphomino-card-width: 80px;
    }
  } 

  .morphomino-item {
    width: var(--morphomino-card-width);
    height: calc(var(--morphomino-card-width) / 1.618);
    border: 1px dotted grey;
    margin: .1rem;
  }

  .morphomino-item svg {
    width: 100%;
    height: 100%;
  }
</style>

<div class="morphomino-item">
  <svg
      class="domino-item-svg"
      viewBox="0 0 50 31"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
    <g>
      <text
        xml:space="preserve"
        transform="matrix(0,-0.26458333,0.26458333,0,39.9372,35.786295)"
        id="text8734"
        style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;text-align:center;white-space:pre;shape-inside:url(#rect8736);fill:#000000;fill-opacity:1;stroke:none"
        x="34.449219"
        y="0"><tspan
          x="38.814453"
          y="24.246094"
          id="part-of-speech">{item.shortPosName}</tspan></text>
      <text
        xml:space="preserve"
        transform="matrix(0.26458333,0,0,0.26458333,0,4.924935)"
        id="text78730"
        style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;text-align:center;white-space:pre;shape-inside:url(#rect78732);fill:#000000;fill-opacity:1;stroke:none"><tspan
          x="29.581055"
          y="44.519531"
          id="title">{item.value}</tspan></text>
      <path
          style="fill:none;stroke:#999999;stroke-width:0.665;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:0.3325, 0.3325;stroke-dashoffset:0"
          d="M 39.935575,1.4058152 V 29.078787"
          id="divider" />
    </g>
  </svg>
</div>
