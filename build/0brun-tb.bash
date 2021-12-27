echo "removing omni.ja.n"
rm -f omni.ja.n

echo "cd omni"
cd omni

echo "zipping"
zip -qr9XD ../omni.ja.n *

echo "cd .."
cd ../
echo "now in $(pwd)"

echo "replacing omni,ja"
cp omni.ja.n thunderbird/omni.ja

echo "launching..."
exec ./thunderbird/thunderbird -purgecaches
