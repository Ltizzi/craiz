const {
  getTotalMemesNumber,
  getTotalFlaggedMemes,
  getTotalModeratedMemes,
  getAllMemes,
  getAllSoftDeletedMemes,
  getAllMemesWithoutComments,
  getAllCommentsFromAMemeById,
  getMemeById,
  getMemesByTag,
  getMemesByUser,
  getUserMemesWithoutComments,
  getUserComments,
  getUserLoopedMemes,
  getUserLikedMemes,
  getMemesByTemplate,
  saveMeme,
  deleteMeme,
  updateMeme,
  addCommentToMeme,
  likeMeme,
  loopMeme,
  flagMeme,
  getAllFlaggedMemes,
  modDeleteMeme,
  modReviewMeme,
  adminDeleteMeme,
} = require("../../models/memes/memes.model");

const { getPagination } = require("../../services/query");

async function httpGetTotalMemesNumber(req, res) {
  try {
    const count = await getTotalMemesNumber();
    return res.status(200).json(count);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpGetTotalFlaggedMemesNumber(req, res) {
  try {
    const count = await getTotalFlaggedMemes();
    return res.status(200).json(count);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpGetTotalModeratedMemesNumber(req, res) {
  try {
    const count = await getTotalModeratedMemes();
    return res.status(200).json(count);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpGetAllMemes(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const memes = await getAllMemes(skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllSoftDeletedMemes(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const memes = await getAllSoftDeletedMemes(skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllMemesWithoutComments(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const memes = await getAllMemesWithoutComments(skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllCommentsFromMemeById(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const memeId = req.query.id;
    const comments = await getAllCommentsFromAMemeById(memeId, skip, limit);
    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetMemeById(req, res) {
  try {
    const memeId = req.query.id;
    const meme = await getMemeById(memeId);
    return res.status(200).json(meme);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllMemesByTag(req, res) {
  try {
    const tag = req.query.tag;
    const memes = await getMemesByTag(tag);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllMemesByTemplate(req, res) {
  try {
    const template = req.query.template;
    const memes = await getMemesByTemplate(template);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllMemesByUser(req, res) {
  try {
    const userId = req.query.user_id;
    const memes = await getMemesByUser(userId);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetUserMemesWoC(req, res) {
  try {
    const userId = req.query.id;
    const { skip, limit } = getPagination(req.query);
    const memes = await getUserMemesWithoutComments(userId, skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ err: err.message });
  }
}

async function httpGetUserComments(req, res) {
  try {
    const userId = req.query.id;
    const { skip, limit } = getPagination(req.query);
    const memes = await getUserComments(userId, skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ err: err.message });
  }
}

async function httpGetUserLoopedMemes(req, res) {
  try {
    const userId = req.query.id;
    const { skip, limit } = getPagination(req.query);
    const memes = await getUserLoopedMemes(userId, skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetUserLikedMemes(req, res) {
  try {
    const userId = req.query.id;
    const { skip, limit } = getPagination(req.query);
    const memes = await getUserLikedMemes(userId, skip, limit);
    return res.status(200).json(memes);
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ err: err.mesage });
  }
}

async function httpSaveMeme(req, res) {
  try {
    const meme = req.body;
    // meme.createdAt = new Date.now();
    await saveMeme(meme);
    return res.status(201).json(meme);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
}

async function httpUpdateMeme(req, res) {
  try {
    const meme = req.body;
    // meme.updatedAt = new Date.now();
    await updateMeme(meme);
    return res.status(200).json(meme);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err.message);
  }
}

async function httpDeleteMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const userId = req.query.userId;
    const existingMeme = await getMemeById(memeId);
    if (!existingMeme) {
      return res.status(404).json({
        error: "Meme not found",
      });
    }
    await deleteMeme(memeId, userId);
    return res.status(200).json({ ok: "meme deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
}

async function httpAddCommentToMeme(req, res) {
  try {
    const memeId = req.query.id;
    const comment = req.body;
    await addCommentToMeme(memeId, comment);
    return res.status(201).json({ ok: "Added comment!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
}

async function httpLikeMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const userId = req.query.userId;
    const response = await likeMeme(memeId, userId);
    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
}

async function httpLoopMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const userId = req.query.userId;
    const response = await loopMeme(memeId, userId);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpFlagMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const response = await flagMeme(memeId);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

async function httpGetAllFlaggedMemes(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const response = await getAllFlaggedMemes(skip, limit);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

async function httpModDeleteMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const response = await modDeleteMeme(memeId);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

async function httpModReviewMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const response = await modReviewMeme(memeId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

async function httpAdminDeleteMeme(req, res) {
  try {
    const memeId = req.query.memeId;
    const response = await adminDeleteMeme(memeId);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

module.exports = {
  httpGetTotalMemesNumber,
  httpGetTotalFlaggedMemesNumber,
  httpGetTotalModeratedMemesNumber,
  httpGetAllMemes,
  httpGetAllSoftDeletedMemes,
  httpGetAllMemesWithoutComments,
  httpGetAllCommentsFromMemeById,
  httpGetMemeById,
  httpGetAllMemesByTag,
  httpGetAllMemesByTemplate,
  httpGetAllMemesByUser,
  httpGetUserMemesWoC,
  httpGetUserComments,
  httpGetUserLoopedMemes,
  httpGetUserLikedMemes,
  httpSaveMeme,
  httpUpdateMeme,
  httpDeleteMeme,
  httpAddCommentToMeme,
  httpLikeMeme,
  httpLoopMeme,
  httpFlagMeme,
  httpGetAllFlaggedMemes,
  httpModDeleteMeme,
  httpModReviewMeme,
  httpAdminDeleteMeme,
};
