# E2E Test Framework : Playwright, TypeScript, GitHub Actions

Mini-projet d'apprentissage : une version réduite d'un dispositif de tests automatisés standardisé, intégré à une pipeline CI/CD, avec notification des résultats.

## Ce que fait le projet

À chaque `git push`, GitHub Actions :

1. récupère le code et installe les dépendances ;
2. lance les tests end-to-end Playwright (Chromium) ;
3. génère un rapport HTML et un rapport JUnit, conservés comme artefacts ;
4. envoie le résultat (✅ / ❌) sur Discord par webhook.

```
git push → GitHub Actions → tests Playwright → rapports → notification Discord
```

## Les tests

Application testée : [saucedemo.com](https://www.saucedemo.com) (boutique de démonstration).

| Fichier | Scénarios |
|---|---|
| `login.spec.ts` | connexion valide, mauvais mot de passe, utilisateur verrouillé |
| `cart.spec.ts` | ajout au panier, parcours jusqu'au checkout |

- **Page Object Model** (`tests/pages/`) : les sélecteurs sont regroupés par page.
- **Tags** `@smoke` et `@regression` pour exécuter une partie des tests.
- **Identifiants `[PROJ-x]`** dans les titres : ils simulent le lien test ↔ ticket JIRA.
- **Rapport JUnit** (`results/junit.xml`) : format importable dans un outil comme JIRA Xray.

## Lancer en local

```bash
npm ci
npx playwright install chromium
npx playwright test --project=chromium
npx playwright test --grep "@smoke" --project=chromium
npx playwright show-report
```

## Pipeline et notification

Le workflow est dans `.github/workflows/playwright.yml`. L'URL du webhook est stockée dans les **GitHub Secrets** (`WEBHOOK_URL`), jamais dans le code.

### Pipeline détectant une régression

Un test a été cassé volontairement, puis corrigé : le run passe de ✅ à ❌ puis à ✅.

![Runs GitHub Actions](docs/runs.png)

![Notification d'échec](docs/discord-failure.png)

![Notification de succès](docs/discord-success.png)

### Rapport de tests

![Rapport Playwright](docs/report.png)

## Limites et suite possible

- La notification utilise **Discord** ; le principe est identique avec un webhook **Microsoft Teams**.
- La traçabilité JIRA Xray est **simulée** (identifiants dans les titres), pas connectée.
- Une seule application testée : l'étape suivante serait un workflow réutilisable appliqué à plusieurs projets.

## Technologies

Playwright, TypeScript, Node.js, GitHub Actions, webhooks.