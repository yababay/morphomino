<script lang="ts">
    import { backgroundColor } from './sections/settings'
    export let pos: string
</script>

<svg viewBox="0 0 50 31">
    <rect
       style={`display:inline;fill:${$backgroundColor};fill-opacity:1;stroke:#FFFFFF;stroke-width:1.03467;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers stroke fill`}
       id="rect4411"
       width="6.4179978"
       height="20.483603"
       x="42"
       y="5.2581987"
       rx="1.3525043"
       ry="1.3525043" />
    <text 
       text-anchor="middle"  x="46" y="15.5" style="font-size:2.5px;fill:#FFFFFF"
       transform="rotate(-90 46 15.5)">{pos}</text>
</svg>
