<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore the nine historically Black Greek-letter organizations of the Divine Nine.">
    <title>Explore | Divine Nine</title>
    <link rel="stylesheet" href="css/styles.css">
    <script type="module" src="js/explore.js"></script>
</head>
<body>

    <header>
        <h1>Divine Nine</h1>

        <nav aria-label="Main navigation">
            <a href="index.html">Home</a>
            <a href="explore.html" aria-current="page">Explore</a>
            <a href="resources.html">Resources</a>
            <a href="contact.html">Contact Us</a>
            <a href="login.html">Login</a>
        </nav>
    </header>

    <main>
        <section class="explore-intro">
            <h2>Explore the Divine Nine</h2>
            <p>
                Discover the history, founding dates, and organizations
                that make up the National Pan-Hellenic Council.
            </p>
        </section>

        <section class="organization-section">
            <h2>Our Organizations</h2>

            <p id="loadingMessage" role="status" aria-live="polite">
                Loading organizations from Firebase...
            </p>

            <p id="errorMessage" role="alert" hidden></p>

            <button type="button" id="retryButton" hidden>
                Try Again
            </button>

            <div
                id="organizationContainer"
                class="organization-grid"
                aria-live="polite"
            ></div>
        </section>
    </main>

    <footer>
        <p>Xavier Wallace | CSci 3054 Web Programming</p>
    </footer>

</body>
</html>

