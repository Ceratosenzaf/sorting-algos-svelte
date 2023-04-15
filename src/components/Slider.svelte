<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
</script>

<div  class={$$props.class}>
  <div class="hidden lg:block h-full">
    <RangeSlider vertical  />
  </div>  
  <div class="lg:hidden h-full">
    <RangeSlider />
  </div>
</div>

<svelte:head>
  <style>
    .rangeSlider.vertical {
      margin: 0 1rem !important;
      min-height: 100% !important;
      padding-top: 1rem !important;
      padding-bottom: 1rem !important;
    } 
    :root {
      --range-slider:          rgb(243 244 246); /* slider main background color */
      --range-handle-inactive: rgb(156 163 175); /* inactive handle color */
      --range-handle:          rgb(156 163 175); /* non-focussed handle color */
      --range-handle-focus:    rgb(55 65 81); /* focussed handle color */
      --range-handle-border:   var(--range-handle);
      --range-range-inactive:  var(--range-handle-inactive); /* inactive range bar background color */
      --range-range:           var(--range-handle-focus); /* active range bar background color */
    }
  </style>
</svelte:head>

