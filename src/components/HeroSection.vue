<script setup lang="ts">
interface SocialLink {
  name: string
  href: string
  icon: 'github' | 'linkedin'
}

const socials: SocialLink[] = [
  { name: 'GitHub', href: 'https://github.com/danielmnunes', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/danielmnunes', icon: 'linkedin' },
]
</script>

<template>
  <section class="hero">
    <div class="container">
      <p class="greeting">Hi, I'm</p>
      <h1>Daniel Nunes</h1>
      <p class="role">Software Engineer · AI-Native</p>
      <p class="bio">
        Software Engineer with 6 years of experience building scalable systems and APIs — now
        focused on AI-native development. I work with Java, Python, Golang and TypeScript to design
        and ship production-ready backends that integrate LLMs, agents, and intelligent pipelines
        into real products.
      </p>
      <div class="socials">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.href"
          :aria-label="social.name"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            v-if="social.icon === 'github'"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          <svg
            v-else-if="social.icon === 'linkedin'"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a href="/cv.pdf" download class="social-link" aria-label="Download CV">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - var(--header-h) - var(--footer-h));
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.greeting {
  font-size: 1rem;
  color: var(--link);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

h1 {
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  color: var(--alt-fg);
  margin-bottom: 0.4rem;
  letter-spacing: -1.5px;
}

.role {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--link);
  font-weight: 500;
  margin-bottom: 1.5rem;
  letter-spacing: -0.3px;
}

.bio {
  max-width: 520px;
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.socials {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.social-link {
  color: var(--fg);
  opacity: 0.6;
  display: flex;
  align-items: center;
  transition:
    opacity var(--transition),
    color var(--transition);
}

.social-link:hover {
  color: var(--link);
  opacity: 1;
  text-decoration: none;
}
</style>
