const couleur = {
    color: 'rouge',
    printColor() {
        console.log(this.color)
    }
}

const fonction = couleur.printColor // il a perdu le contexte de this
fonction()