<template>
  <footer>
    <div class="footer__links-container">
      <div class="footer__logo-container">
        <router-link :to="{name: 'home'}">
          <b-img
            :src="websiteLogo"
            class="footer__logo"
          />
        </router-link>
        <p class="">
          D&D Dashboard 2025 <br>
          All Rights Reserved &copy;
        </p>
      </div>

      <div class="footer__links">
        <div
          v-for="group in linkGroups"
          :key="group.title"
          class="footer__link-group"
        >
          <h4>{{ group.title }}</h4>
          <div class="footer__link-list">
            <a
              v-for="link in group.links"
              :key="link.title"
              :href="link.url"
              class="footer_link"
            >
              {{ link.title }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__copyrights">
      <p>@2025 D&D Dashboard. All rights reserved</p>

      <div class="footer__copyrights-link">
        <router-link :to="{name: 'privacy-policy'}">Privacy Policy</router-link>
        <router-link :to="{name: 'terms-and-conditions'}">Terms & Conditions</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "PageFooter",
    data() {
      return {
        websiteLogo: require("@/assets/images/website-logo.png"),
        linkGroups: [
          {
            title: "Socials",
            links: [
              {title: "GitHub", url: "https://github.com/JBrokenshire/dnd-portal"},
              {title: "Instagram", url: "https://www.instagram.com/jbrokenshire0/"},
              {title: "LinkedIn", url: "https://www.linkedin.com/in/jared-brokenshire-771448227/"},
            ],
          },
        ]
      }
    }
  }
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  border-top: 1px solid lightgray;
}

.footer__links-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 1.25rem;
}

.footer__logo-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1.25rem;
}

.footer__logo {
  width: 100px;
  aspect-ratio: 1;
}

.footer__logo img {
  object-fit: contain;
}

.footer__links {
  display: flex;
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
  gap: 5rem;
  margin-top: 2.5rem;
}


.footer__link-group {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  min-width: 170px;
}

.footer__link-list {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.footer__copyrights {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  border-top: 1px solid lightgray;
  padding: 1.25rem;
}

.footer__copyrights-link {
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 1rem;
  gap: 1.25rem;
}

/* sm Breakpoint */
@media (min-width: 576px) {
  .footer__links-container {
    padding-inline: 4rem;
  }

  .footer__copyrights {
    padding-inline: 4rem;
  }

  .footer__copyrights-link {
    justify-content: end;
  }
}

/* md Breakpoint */
@media (min-width: 768px) {

  .footer__links-container {
    flex-direction: row;
  }

  .footer__links {
    justify-content: end;
  }
}
</style>