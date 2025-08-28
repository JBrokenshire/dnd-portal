<template>
  <div class="flex items-center cursor-pointer mb-[5px]">
    <!-- Proficiency Indicator -->
    <div class="flex items-center pl-[3px] w-[30px]">
      <!-- No Proficiency -->
      <span
        v-if="$props.proficiencyType === ''"
        aria-label="Not Proficient"
        class="cursor-default"
      >
        <tooltip text="Not Proficient">
          <span
            class="bg-[#333] border border-dotted border-gray-light rounded-[50%] inline-flex w-[10px] h-[10px]"
          />
        </tooltip>
      </span>

      <!-- Half Proficiency -->
      <span
        v-if="$props.proficiencyType === 'Half Proficiency'"
        aria-label="Half Proficiency"
        class="cursor-default"
      >
        <tooltip text="Half Proficiency">
          <svg
            class="inline-flex w-[10px] h-[10px]"
            viewBox="0 0 9.99416 9.99417"
          >
            <g>
              <g>
                <path
                  d="M6.90936,9.61388a4.92424,4.92424,0,0,0,.51441-.271c.11352-.06342.23217-.11218.34143-.18512A5.01231,5.01231,0,0,0,9.15765,7.76537c.073-.10938.122-.22834.18531-.34186a4.90594,4.90594,0,0,0,.27087-.51422,4.92218,4.92218,0,0,0,.17236-.55609c.03528-.12464.0846-.24286.11023-.37128a5.01118,5.01118,0,0,0,0-1.96973c-.02563-.12793-.0747-.2456-.10986-.36975a4.89619,4.89619,0,0,0-.17285-.55762,4.95632,4.95632,0,0,0-.26953-.51208c-.06385-.11432-.11316-.234-.18665-.34406A5.009,5.009,0,0,0,7.76544.83659C7.65533.76311,7.53571.71379,7.42133.65a4.93653,4.93653,0,0,0-.512-.26965A4.92788,4.92788,0,0,0,6.35175.2075c-.12427-.035-.242-.08422-.36988-.10974A5.01113,5.01113,0,0,0,4.01215.0977c-.12842.02564-.24659.075-.37122.11023a4.91883,4.91883,0,0,0-.556.17236,4.90994,4.90994,0,0,0-.51428.27082c-.11353.06341-.23255.11242-.34192.18542A5.012,5.012,0,0,0,.83636,2.22893c-.073.10919-.1217.228-.18505.34137a4.89294,4.89294,0,0,0-.271.51452,4.90106,4.90106,0,0,0-.17212.555c-.0354.12512-.08484.24371-.11059.37268a5.01485,5.01485,0,0,0,0,1.96911c.02587.1294.07543.24854.11108.37415a4.90112,4.90112,0,0,0,.17151.55353A4.92736,4.92736,0,0,0,.65228,7.426c.06311.11261.11157.23059.18408.33911a5.00987,5.00987,0,0,0,1.39258,1.3927c.10865.07239.22657.12091.33911.184a4.92488,4.92488,0,0,0,.51685.27216,4.91647,4.91647,0,0,0,.55347.17157c.12561.03558.24475.0852.37414.111a5.01264,5.01264,0,0,0,1.96912,0c.1289-.02576.24756-.0752.37268-.1106A4.91928,4.91928,0,0,0,6.90936,9.61388ZM1.16962,4.99712a3.82728,3.82728,0,0,1,6.53369-2.7063L2.29071,7.70341A3.81549,3.81549,0,0,1,1.16962,4.99712Z"
                  fill="#972e2e"
                />
              </g>
            </g>
          </svg>
        </tooltip>
      </span>

      <!-- Proficiency -->
      <span
        v-if="$props.proficiencyType === 'Proficiency'"
        aria-label="Proficiency"
        class="cursor-default"
      >
        <tooltip text="Proficiency">
          <svg
            class="inline-flex w-[10px] h-[10px]"
            viewBox="0 0 10 10"
          >
            <g>
              <g>
                <circle
                  cx="5"
                  cy="5"
                  fill="#972e2e"
                  r="5"
                />
              </g>
            </g>
          </svg>
        </tooltip>
      </span>

      <!-- Expertise -->
      <span
        v-if="$props.proficiencyType === 'Expertise'"
        aria-label="Expertise"
        class="cursor-default"
      >
        <tooltip text="Expertise">
          <span class="relative inline-flex w-[10px] h-[10px]">
            <svg
              class="w-[17px] h-[17px] left-[-3px] top-[-3px] absolute"
              viewBox="0 0 17 17"
            >
              <g>
                <g>
                  <g>
                    <path
                      d="M8.5,0A8.5,8.5,0,1,0,17,8.5,8.49382,8.49382,0,0,0,8.5,0Zm0,15.00854A6.50854,6.50854,0,1,1,15.00854,8.5,6.509,6.509,0,0,1,8.5,15.00854Z"
                      fill="#972e2e"
                    />
                    <circle
                      cx="8.5"
                      cy="8.5"
                      fill="#972e2e"
                      r="4.25"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </span>
        </tooltip>
      </span>
    </div>

    <!-- Ability -->
    <div class="text-gray-light font-bold uppercase text-[11px] w-[40px] px-[5px]">
      {{ $props.abilityAbbreviation }}
    </div>

    <!-- Skill -->
    <div class="text-white py-[5px] border-b border-[#c5313166] text-[14px] grow shrink basis-0">
      {{ $props.skill }}
    </div>

    <!-- Modifier  -->
    <div
      class="p-[2px] border-b border-[#c5313166] self-end text-[14px] text-right"
    >
      <button
        class="h-[24px] w-[40px] text-[20px] text-white border border-fighter inline-flex items-center justify-center rounded-[4px] bg-transparent transition-200 hover:bg-fighter-faded  cursor-pointer"
      >
        <span class="inline-flex items-center">
          <span class="text-gray-light text-[.75rem] mr-[.063rem]">+</span>
          <span>2</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
  import Tooltip from "@/components/ui/Tooltip.vue";

  export default {
    name: "SkillCallout",
    components: {Tooltip},
    props: {
      abilityAbbreviation: {
        type: String,
        required: true,
      },
      skill: {
        type: String,
        required: true,
      },
      character: {
        type: Object,
        required: true,
      },
      proficiencyType: {
        type: String,
        default: "",
      }
    },
  }
</script>

<style scoped>

</style>