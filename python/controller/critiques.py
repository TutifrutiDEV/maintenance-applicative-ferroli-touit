import request.request as req

def add_critiques(data):
    if (
        not "attraction_id" in data
        or not "nom" in data
        or not "prenom" in data
        or not "texte" in data
        or not "note" in data
    ):
        return False

    requete = """
        INSERT INTO critiques (attraction_id, nom, prenom, texte, note)
        VALUES (?, ?, ?, ?, ?);
    """

    id = req.insert_in_db(
        requete,
        (
            data["attraction_id"],
            data["nom"],
            data["prenom"],
            data["texte"],
            data["note"],
        ),
    )

    return id

def get_all_critiques():
    json = req.select_from_db("SELECT * FROM critiques")

    return json

def get_critiques(id):
    if not id:
        return False

    json = req.select_from_db(
        "SELECT * FROM critiques WHERE id = ?",
        (id,),
    )

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_critiques(id):
    if not id:
        return False

    req.delete_from_db("DELETE FROM critiques WHERE id = ?", (id,))

    return True

def update_critiques(data):
    if (
        not "id" in data
        or not "attraction_id" in data
        or not "nom" in data
        or not "prenom" in data
        or not "texte" in data
        or not "note" in data
    ):
        return False

    requete = """
        UPDATE critiques
        SET attraction_id=?, nom=?, prenom=?, texte=?, note=?
        WHERE id = ?;
    """

    req.insert_in_db(
        requete,
        (
            data["attraction_id"],
            data["nom"],
            data["prenom"],
            data["texte"],
            data["note"],
            data["id"],
        ),
    )

    return True
